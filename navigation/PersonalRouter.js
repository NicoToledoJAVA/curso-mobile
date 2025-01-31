import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';


import { useEffect } from 'react';


import { Colours } from '../config/colours';
import CategoriesStack from './stacks/CategoriesStack'
import InventoryStack from './stacks/WholeListStack'
import CartStack from './stacks/CartStack'
import TabNavigator from './stacks/TabNavigator';
import AuthStack from './stacks/AuthStack'
import { useSelector, useDispatch } from 'react-redux';

import { deleteUser, setUser } from '../contexts/userSlice';
import MyProfile from './screens/myProfile/MyProfile';

import {
    init,
    fetchSession
} from '../contexts/deviceDB/dbSqlite';
const Tab = createBottomTabNavigator();


const PersonalRouter = () => {
    const idToken = useSelector(state => state.user.idToken)
    const dispatch = useDispatch()

    useEffect(()=>{
      (async ()=>{
        try {
          await init()
          dispatch(deleteUser())
          const sessionUser = await fetchSession()
          console.log("Consulta de sesión en SQLite: " + sessionUser.email);
          if(sessionUser){
            dispatch(setUser(sessionUser))
          }
        } catch (error) {
          console.log(error)
        }
      })()

    },[])

   

    return (
        <NavigationContainer>

            {idToken ? <TabNavigator /> : <AuthStack />}

        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: Colours.primary,
        height: 70,
        padding: 10,

    },


})
export default PersonalRouter;
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useEffect } from 'react';


import { Colours } from '../config/colours';
import CategoriesStack from './stacks/CategoriesStack'

import InventoryStack from './stacks/WholeListStack'
import CartStack from './stacks/CartStack'
const Tab = createBottomTabNavigator();


const PersonalRouter = () => {

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: styles.tabBar                   
                }}
            >
                <Tab.Screen name='Categorias' component={CategoriesStack} />
                <Tab.Screen name='Ver Todos' component={InventoryStack} />
                <Tab.Screen name='Chango' component={CartStack} />
            </Tab.Navigator>

        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    tabBar:{
        backgroundColor:Colours.primary,
        height:70
    }
})
export default PersonalRouter;
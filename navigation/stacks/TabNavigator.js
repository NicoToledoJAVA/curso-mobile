import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../../components/TabBarIcon';


import { useEffect } from 'react';


import { Colours } from '../../config/colours';
import CategoriesStack from '../stacks/CategoriesStack'

import InventoryStack from '../stacks/WholeListStack'
import CartStack from '../stacks/CartStack'
import MyProfile from '../screens/myProfile/MyProfile';
import MyProfileStack from './MyProfileStack';

const Tab = createBottomTabNavigator();


const TabNavigator = () => {

    return (

        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar,
                tabBarLabelPosition: "beside-icon",
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: 80,
                backgroundColor: "transparent",
            }}
        >
            <Tab.Screen
                name='Categorias'
                component={CategoriesStack}
                options={{
                    tabBarIcon: ({ focused }) => <TabBarIcon text="Categorias" icon="view-grid-plus-outline" focused={focused} />
                }}
            />
            <Tab.Screen
                name='Ver Todos'
                component={InventoryStack}
            />
            <Tab.Screen
                name='Chango'
                component={CartStack}
                options={{
                    tabBarIcon: ({ focused }) => <TabBarIcon text="Chango" icon="cart-check" focused={focused} />
                }}
            />

            <Tab.Screen
                name='Ver Perfil'
                component={MyProfileStack}
                options={{
                    tabBarIcon: ({ focused }) => <TabBarIcon text="Perfil" icon="badge-account-horizontal-outline" focused={focused} />
                }}
            />
        </Tab.Navigator>


    )
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: Colours.button,
        height: 70,
        padding: 10,

    },


})
export default TabNavigator;
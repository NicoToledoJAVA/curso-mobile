import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Header from '../../components/Header'
import MyProfile from '../screens/myProfile/MyProfile';
import ImageSelector from '../screens/myProfile/ImageSelector';
const Stack = createNativeStackNavigator();

const MyProfileStack = () => {

    return (
        <Stack.Navigator
            screenOptions={({ route }) => ({
                header: () => {
                    
                    return <Header title= "Perfil de Usuario" routeName = {route.name}
                    />
                }
            })}



        >
            <Stack.Screen name='MyProfile' component={MyProfile} />
            <Stack.Screen name='ImageSelector' component={ImageSelector} />
        </Stack.Navigator>

    )
}

export default MyProfileStack;
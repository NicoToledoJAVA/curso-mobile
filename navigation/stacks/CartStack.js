import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Cart from '../screens/cart/Cart'
import Header from '../../components/Header'

const Stack = createNativeStackNavigator();

const CartStack = () => {

    return (
        <Stack.Navigator
            screenOptions={({ route }) => ({
                header: () => {
                    
                    return <Header title= "Carrito" routeName = {route.name}
                    />
                }
            })}



        >
            <Stack.Screen name='Cart' component={Cart} />
        </Stack.Navigator>

    )
}

export default CartStack;
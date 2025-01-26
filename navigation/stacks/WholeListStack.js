import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Table from '../screens/entire_list/Table'
import Header from '../../components/Header'

const Stack = createNativeStackNavigator();

const InventoryStack = () => {

    return (
        <Stack.Navigator
            screenOptions={({ route }) => ({
                header: () => {
                    console.log("Recibí una ruta: " + route.name)
                    return <Header title= "Todas las existencias " routeName = {route.name}
                    />
                }
            })}



        >
            <Stack.Screen name='Table' component={Table} />
        </Stack.Navigator>

    )
}

export default InventoryStack;
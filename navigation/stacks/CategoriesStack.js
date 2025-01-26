
import Header from '../../components/Header';

import AllCategories from '../screens/categories/Categories'




import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
// Crea un reducer vacío o mínimo
const emptyReducer = (state = {}, action) => state;



const CategoriesStack = () => {
    return (

        <Stack.Navigator
            screenOptions={({ route }) => ({
                header: () => {
                    console.log("Recibí una ruta: " + route.name)
                    return <Header title={
                        route.name === "Categories" ? "Seleccione una Categoría" :
                            route.name === "All" ? "Detalle de todas las existencias" :
                                route.name === "CategoryScreen" ? "Existencias de " + route.params.category :
                                    route.name === "Detalles" ? "Perfil ampliado" : ""
                    }
                    />
                }
            })}

        >
            <Stack.Screen name='AllCategories' component={AllCategories} />

        </Stack.Navigator >

    )


}
export default CategoriesStack;
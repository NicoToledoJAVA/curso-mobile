import Header from '../../components/Header';
import AllCategories from '../screens/categories/Categories';
import CategoryScreen from '../screens/categories/CategoryScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const CategoriesStack = () => {
    return (
        <Stack.Navigator
            screenOptions={({ route }) => ({
                header: () => {
                   
                    return <Header
                        title={
                            route.name === "AllCategories" ? "Seleccione una Categoría" :
                                route.name === "CategoryScreen" ? "Existencias de " + route.params.category :
                                    route.name === "Detalles" ? "Perfil ampliado" : ""
                        }
                    />;
                }
            })}
        >
            <Stack.Screen name="AllCategories" component={AllCategories} />
            <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
        </Stack.Navigator>
    );
};

export default CategoriesStack;
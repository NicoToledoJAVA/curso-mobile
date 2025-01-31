import { StyleSheet, Text, View, FlatList } from "react-native";
import CarritoItem from '../../../components/CarritoItem';
import cart from '../../../provi/cart.json';  // Asegúrate de que la estructura de `cart` esté bien definida

const Cart = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={cart.products} 
                keyExtractor={item => item.id}  // Convierte el id a string si es necesario
                renderItem={({ item }) => <CarritoItem product={item} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
});

export default Cart;

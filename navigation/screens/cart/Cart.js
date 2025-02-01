import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { useGetCartQuery } from '../../../services/user'; // Hook de carrito
import { useGetWineByIdQuery } from '../../../services/shop'; // Hook de carrito
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Colours } from '../../../config/colours';
import { fireBaseUrl } from '../../../config/fetchInfo';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';


const Cart = () => {
  const navigation = useNavigation();
  const localId = useSelector(state => state.user.localId);
  const { data: cart, isLoading, refetch } = useGetCartQuery({ localId }, { refetchOnMountOrArgChange: true });
 

  const [total, setTotal] = useState(0);
  const [wines, setWines] = useState([]); // Estado para almacenar los vinos

  // Refetch cada vez que el usuario entra a la pantalla del carrito
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  useEffect(() => {
   
    if (cart) {
      setTotal(cart.reduce((acc, item) => acc + item.price * item.quantity, 0));
  
      // Obtener detalles de los vinos en paralelo
      const fetchWines = async () => {
        const fetchedWines = {};
        
        await Promise.all(cart.map(async (item) => {
          try {
            const response = await fetch(`${fireBaseUrl}/wines/${item.productId}.json`);
            const wineData = await response.json();
            fetchedWines[item.productId] = wineData;
           
          } catch (error) {
            console.error('Error obteniendo el vino:', error);
          }
        }));
  
        setWines(fetchedWines); // Guardar los vinos en el estado
      };
  
      fetchWines();
    }
  }, [cart]);

  const confirmCart = () => {
    const createdAt = new Date().toLocaleString();
    const order = {
      products: cart,
      createdAt,
      total
    };
    console.log('Orden confirmada', order);
    navigation.navigate("OrdersStack");
  };

  if (isLoading) {
    return <Text>Cargando carrito...</Text>;
  }

  if (!cart || cart.length === 0) {
    return <Text>No hay productos en el carrito</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}        
        renderItem={({ item }) => {
          const wine = wines[item.productId];
          return (
            <View style={styles.productCard}>
              <Text style={styles.productTitle}>{item.name}</Text>              
              <Text>Cantidad: {item.quantity}</Text>
             
              {wine ? (
                <>
                  <Text style={styles.wineTitle}>Vino: {wine.name}</Text>
                  <Text>Año: {wine.year}</Text>
                  <Text>Precio: {wine.price} $ ARG</Text>
                </>
              ) : (
                <Text>Cargando detalles del vino...</Text>
              )}
            </View>
          );
        }}
      />
      <View style={styles.containerTotal}>
        <Text style={styles.text}>Total: {total} $ ARG</Text>
        <Pressable style={styles.button} onPress={confirmCart}>
          <Text style={styles.buttonText}>Finalizar Compra</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative"
  },
  containerTotal: {
    width: "100%",
    backgroundColor: Colours.accent,
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 0
  },
  text: {
    color: Colours.lightGray,
    fontSize: 16
  },
  button: {
    backgroundColor: Colours.primary,
    padding: 10,
    borderRadius: 5
  },
  buttonText: {
    color: Colours.lightGray
  },
  productCard: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold"
  },
  wineTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5
  }
});


export default Cart;

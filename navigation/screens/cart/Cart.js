import { StyleSheet, Text, View, FlatList, Pressable, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { useGetCartQuery } from '../../../services/cart';
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
  const [wines, setWines] = useState([]); 

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  useEffect(() => {
    if (cart) {
      setTotal(cart.reduce((acc, item) => acc + item.price * item.quantity, 0));

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

        setWines(fetchedWines);
      };

      fetchWines();
    }
  }, [cart]);

  const updateQuantity = async (productId, change) => {
    if (!cart) return;
    const updatedCart = cart.map(item => 
      item.productId === productId 
        ? { ...item, quantity: Math.max(1, item.quantity + change) } 
        : item
    );
    await patchCart({ localId, cart: updatedCart });
  };

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
              {/* Contenedor con flexDirection: 'row' para colocar la imagen a la izquierda */}
              <View style={styles.productContent}>
                {wine?.photo && (
                  <Image
                    source={{ uri: `data:image/jpeg;base64,${wine.photo}` }}
                    style={styles.image}
                  />
                )}
                <View style={styles.productDetails}>
                  <Text style={styles.productTitle}>{item.name}</Text>
                  <Text>Cantidad: {item.quantity}</Text>

                  {wine ? (
                    <>
                      <Text style={styles.wineTitle}>{wine.name}</Text>
                      <Text>Año: {wine.year}</Text>
                      <Text>Precio: {wine.price} $ ARG</Text>
                    </>
                  ) : (
                    <Text>Cargando detalles del vino...</Text>
                  )}
                </View>
                <View style={styles.quantityControls}>
                <Pressable onPress={() => updateQuantity(item.productId, -1)} style={styles.buttonSmall}>
                  <Text style={styles.buttonText}>-</Text>
                </Pressable>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <Pressable onPress={() => updateQuantity(item.productId, 1)} style={styles.buttonSmall}>
                  <Text style={styles.buttonText}>+</Text>
                </Pressable>
              </View>
              </View>
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
  image: {
    width: 80,  // Reducimos el tamaño para mejor alineación
    height: 80,
    borderRadius: 10,
    marginRight: 10, // Espaciado entre la imagen y el texto
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
  productContent: {
    flexDirection: "row", // Imagen a la izquierda, texto a la derecha
    alignItems: "center"
  },
  productDetails: {
    flex: 1 // Permite que el texto ocupe el espacio disponible
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold"
  },
  wineTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center"
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16
  },
  buttonSmall: {
    backgroundColor: Colours.primary,
    padding: 5,
    borderRadius: 5
  }
});


export default Cart;


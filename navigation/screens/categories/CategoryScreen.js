//CategoryScreen.js

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePatchCartMutation, useGetCartQuery } from '../../../services/cart';
import { useGetWinesQuery, useGetWineByIdQuery } from '../../../services/shop';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';

const CategoryScreen = ({ route }) => {
  const { category = 'reserva' } = route.params || {};
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const localId = useSelector(state => state.user.localId);
  const { data: cartData } = useGetCartQuery({ localId });
  const [updateCart] = usePatchCartMutation();
  const { data: winesData, error, isLoading } = useGetWinesQuery();

  useEffect(() => {
    if (winesData) {
      const filteredItems = Object.values(winesData).filter(
        (wine) => wine.category?.toLowerCase() === category.toLowerCase()
      );
      setItems(filteredItems);
    }
  }, [winesData, category]);

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleAddToCart = async () => {
    if (!localId) {
      alert('Debes iniciar sesión para agregar productos al carrito.');
      return;
    }

    const currentItem = items[currentIndex];
    const currentCart = cartData || [];
    const existingItemIndex = currentCart.findIndex(
      (item) => item.productId === currentItem.id
    );

    let updatedCart;

    if (existingItemIndex !== -1) {
      updatedCart = currentCart.map((item) =>
        item.productId === currentItem.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...currentCart, { productId: currentItem.id, quantity: 1 }];
    }

    try {
      await updateCart({ localId, cart: updatedCart });
      dispatch(updateCart(updatedCart));
      alert('Producto agregado al carrito.');
    } catch (error) {
      console.error('Error al actualizar el carrito:', error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Hubo un error al cargar los ítems.</Text>
      </View>
    );
  }

  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No se encontraron ítems para la categoría: {category}</Text>
      </View>
    );
  }

  const currentItem = items[currentIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categoría: {category}</Text>
      <View style={styles.itemContainer}>
        {currentItem.photo && (
          <Image
            source={{ uri: `data:image/jpeg;base64,${currentItem.photo}` }}
            style={styles.image}
          />
        )}
        <Text style={styles.itemName}>{currentItem.name}</Text>
        <Text style={styles.itemDetails}>Año: {currentItem.year}</Text>
        <Text style={styles.itemDetails}>Tipo: {currentItem.type}</Text>
        <Text style={styles.itemDetails}>
          Precio: ${currentItem.price.toLocaleString('es-AR')}
        </Text>
      </View>
      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={[styles.navButton, currentIndex === 0 && styles.disabledButton]}
          onPress={handlePrevious}
          disabled={currentIndex === 0}
        >
          <Text style={styles.buttonText}>{'<'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, currentIndex === items.length - 1 && styles.disabledButton]}
          onPress={handleNext}
          disabled={currentIndex === items.length - 1}
        >
          <Text style={styles.buttonText}>{'>'}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
        <Text style={styles.buttonText}>Agregar al carrito 🛒</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDetails: {
    fontSize: 16,
    color: '#555',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 20,
  },
  navButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
  addButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#28a745',
    borderRadius: 5,
  },
});

export default CategoryScreen;
//CategoryScreen.js

import React, { useState, useEffect } from 'react';
import url from '../../../config/fetchInfo';


import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';

const CategoryScreen = ({ route }) => {
    const { category = 'reserva' } = route.params || {}; 
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  useEffect(() => {
    fetchCategoryItems(category);
  }, [category]);

  const fetchCategoryItems = async (category) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${url}/getAll`);
      const data = await response.json();

      // Filtrar los ítems, ignorando mayúsculas y minúsculas
      const filteredItems = data.filter(
        (wine) => wine.category?.toLowerCase() === category.toLowerCase()
      );

      setItems(filteredItems);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching category items:', error);
      setError('Hubo un error al cargar los ítems. Intenta nuevamente.');
      setLoading(false);
    }
  };

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

  if (loading) {
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
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => fetchCategoryItems(category)}>
          <Text style={styles.buttonText}>Reintentar</Text>
        </TouchableOpacity>
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
        <Text style={styles.itemDetails}>Precio: ${currentItem.price.toLocaleString('es-AR')}</Text>
      </View>

      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={[styles.navButton, currentIndex === 0 && styles.disabledButton]}
          onPress={handlePrevious}
          disabled={currentIndex === 0}
        >
          <Text style={styles.buttonText}>{"<"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, currentIndex === items.length - 1 && styles.disabledButton]}
          onPress={handleNext}
          disabled={currentIndex === items.length - 1}
        >
          <Text style={styles.buttonText}>{">"}</Text>
        </TouchableOpacity>
      </View>
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
  retryButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
});

export default CategoryScreen;
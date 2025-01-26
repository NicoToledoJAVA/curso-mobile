//Categories.js

import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { 
  NavigationContainer,
  useNavigation
} from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';


import url from '../../../config/fetchInfo';
import CategoryScreen from './CategoryScreen';
import { Colours } from '../../../config/colours';

const AllCategories = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchCategories();
 
 
  }, []);

  const fetchCategories = async () => {
   
    try {
      const response = await fetch(`${url}/getAll`); // Cambia la URL según tu configuración
      const data = await response.json();

      // Obtener las categorías únicas
      const uniqueCategories = [...new Set(data.map((wine) => wine.category))];
      setCategories(uniqueCategories);
      setLoading(false);
    } catch (error) {
      console.error('Error fetchis:', errr);
      setLoading(false);
    }
  };

  const handleCategoryClick = (category) => {
    console.log(`Category clicked: ${category}`);
    navigation.navigate("CategoryScreen", { category });
    //navigation.navigate(CategoryScreen, { category: category })
    // Aquí puedes agregar lógica adicional, como navegación o filtrado
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <Text style={styles.loadingText}>Cargando...</Text>
      ) : (
        categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => handleCategoryClick(category)}
          >
            <Text style={styles.buttonText}>{category}</Text>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Asegura que el contenedor ocupe todo el espacio disponible
    justifyContent: 'center', // Alinea verticalmente al centro
    alignItems: 'center', // Centra horizontalmente los botones
    padding: 20,
  },
  button: {
    backgroundColor: Colours.button,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#888',
    marginTop: 20,
  },
});

export default AllCategories;

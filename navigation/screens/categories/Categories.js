//Categories.js

import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGetWinesQuery, useGetWineByIdQuery } from '../../../services/shop';
import { Colours } from '../../../config/colours';



const AllCategories = () => {
  const navigation = useNavigation();


  const { data = [], error, isLoading } = useGetWinesQuery();
  const { data: wine } = useGetWineByIdQuery(1); // Obtenemos el vino con ID 1

  // Si ya tienes datos, modifica el atributo "photo"
  const modifiedWine = wine ? { ...wine, photo: "Va foto" } : null;

  // Procesar las categorías únicas y eliminar el primer valor
  const categories = [...new Set(data.map((wine) => wine.category).slice(1))]; // Eliminamos el primer valor, que lo habiamos puesto a modo de ejemplo y decidimos dejar para complejizar la query


  const handleCategoryClick = (category) => {
    navigation.navigate("CategoryScreen", { category });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isLoading ? (
        <Text style={styles.loadingText}>Cargando...</Text>
      ) : error ? (
        <Text style={styles.loadingText}>Error al cargar las categorías</Text>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
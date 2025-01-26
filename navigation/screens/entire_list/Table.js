import React, { useEffect, useState } from 'react';
import url from '../../../config/fetchInfo';
import * as ScreenOrientation from 'expo-screen-orientation';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

const Table = () => {
  const [wines, setWines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWines();
   
  }, []);

  const fetchWines = async () => {
    try {
      const response = await fetch(`${url}/getAll`); // Cambia la URL según tu configuración
      const data = await response.json();
      setWines(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching wines:', error);
      setLoading(false);
    }
  };

  const handleWineClick = (id) => {
    console.log(`Wine clicked: ${id}`);
    // Aquí puedes agregar navegación o lógica adicional
  };

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.table}>
        {/* Header */}
        <View style={styles.row}>
          <Text style={[styles.columnHeader, styles.text]}>Ilustración</Text>
          <Text style={[styles.columnHeader, styles.text]}>Nombre</Text>
          <Text style={[styles.columnHeader, styles.text]}>Año</Text>
          <Text style={[styles.columnHeader, styles.text]}>Tipo</Text>
          <Text style={[styles.columnHeader, styles.text]}>Categoría</Text>
          <Text style={[styles.columnHeader, styles.text]}>Precio</Text>
        </View>

        {/* Body */}
        {loading ? (
          <Text style={styles.loadingText}>Cargando...</Text>
        ) : (
          wines.map((wine) => (
            <TouchableOpacity
              key={wine.id}
              onPress={() => handleWineClick(wine.id)}
              style={styles.row}
            >
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: `data:image/png;base64,${wine.photo}` }}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>

              <Text style={[styles.cell]}>{wine.name}</Text>
              <Text style={styles.cell}>{wine.year}</Text>
              <Text style={styles.cell}>{wine.type}</Text>
              <Text style={styles.cell}>{wine.category}</Text>
              <Text style={[styles.cell, styles.bold, styles.alignRight]}>
                ${wine.price.toLocaleString('es-AR')}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
    flexWrap: 'wrap', // Permite el ajuste de las filas
  },
  columnHeader: {
    backgroundColor: '#3c45ab',
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    paddingHorizontal: 20,
    padding: 15,
  },
  cell: {
    padding: 5,
    flex: 1,
    textAlign: 'center',
  },
  imageContainer: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  image: {
    width: 37.8,
    height: 37.8,
  },
  alignLeft: {
    textAlign: 'left',
  },
  alignRight: {
    textAlign: 'right',
  },
  text: {
    fontSize: 16,
    color: '#ffffff',
  },
  bold: {
    fontWeight: 'bold',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
  scrollViewContent: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Esto permite el desplazamiento tanto horizontal como vertical
  },
});

export default Table;

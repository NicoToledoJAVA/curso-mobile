import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const CarritoItem = ({ product }) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.productName}>{product.title}</Text> 
      <Text style={styles.productPrice}>${product.price}</Text> 
      <Text style={styles.productProps}>${product.description}</Text> 
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productProps: {
    fontSize: 14,
    color: 'black',
  },
  productPrice: {
    fontSize: 14,
    color: 'green',
  },
});

export default CarritoItem;
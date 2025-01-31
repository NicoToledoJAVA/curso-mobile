import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, incrementByAmount } from '../contexts/counterSlice'; // Importar acciones

const Counter = () => {
  const [incrementAmount, setIncrementAmount] = useState(0); // Controla el incremento personalizado
  const counter = useSelector((state) => state.counter.value); // Obtener el estado desde Redux
  const dispatch = useDispatch();

  const handleInputChange = (value) => {
    const numericValue = parseInt(value, 10);
    if (isNaN(numericValue)) {
      setIncrementAmount(0); // Valor predeterminado si la entrada no es válida
    } else {
      setIncrementAmount(numericValue);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="-" onPress={() => dispatch(decrement())} />
      <Text style={styles.counter}>{counter}</Text>
      <Button title="+" onPress={() => dispatch(increment())} />
      <TextInput
        style={styles.input}
        value={incrementAmount.toString()} // Convertir el valor a string para evitar errores
        onChangeText={handleInputChange} // Validar y actualizar el valor
        placeholder="Cantidad"
        keyboardType="numeric"
      />
      <Button
        title="Cambiar"
        onPress={() => dispatch(incrementByAmount(incrementAmount))}
      />
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  counter: {
    fontSize: 32,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    width: 100,
    textAlign: 'center',
    marginVertical: 10,
  },
});
import React from 'react';
import { Pressable, StyleSheet, Text, View, Platform, SafeAreaView, StatusBar } from 'react-native';
import { Colours } from '../config/colours'; // Consistente con la importación
import ArrowGoBack from './ArrowGoBack';
import { useNavigation } from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';




const Header = ({title}) => {
  const navigate = useNavigation();

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        Platform.OS === 'android' ? styles.androidPadding : styles.iosPadding,
      ]}
    >
      <View style={styles.container}>
        {navigate.canGoBack() ? <ArrowGoBack /> : null}
        <Text style={styles.title}>{title}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor:Colours.background, // Usa el color desde el archivo colours.js
    flex: 0,
  },
  androidPadding: {
    paddingTop: StatusBar.currentHeight, // Espacio adicional para la barra de estado en Android
  },
  iosPadding: {
    paddingTop: 20, // Ajuste adicional para iOS
  },
  container: {
    backgroundColor: Colours.button, // Usa el color desde el archivo colours.js
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  title: {
    color: Colours.lightGray, // Usa el color desde el archivo colours.js
    fontSize: 16,
    fontFamily: 'josefin',
  },
  logout: {
    position: 'absolute',
    right: 10,
  },
});
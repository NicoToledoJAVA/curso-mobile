import React from 'react';
import { Pressable, StyleSheet, Text, View, Platform, SafeAreaView, StatusBar } from 'react-native';
import { Colours } from '../config/colours'; // Consistente con la importación
import ArrowGoBack from './ArrowGoBack';
import { useNavigation } from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useDispatch } from 'react-redux';
import { deleteSesion } from '../contexts/deviceDB/dbSqlite';
import { deleteUser } from '../contexts//userSlice';

const Header = ({title}) => {
  const navigate = useNavigation();
  
  const dispatch = useDispatch();

  const onLogout = () => {
    deleteSesion()
    dispatch(deleteUser())
  }

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
        <Pressable onPress={onLogout} style={styles.logout}>
        <AntDesign name="logout" size={24} color= {Colours.lightGray} />
        </Pressable>
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
    fontWeight: 'bold', // Usa 'bold' en lugar de 'bolder'
    position: 'absolute',
    right: 10,
  },
});
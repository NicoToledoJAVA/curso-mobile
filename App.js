
import PersonalRouter from './navigation/PersonalRouter';
import { Colours } from './config/colours';
import CategoriesStack from './navigation/stacks/CategoriesStack';

import {
  NavigationContainer,
  useNavigation
} from '@react-navigation/native';




import {
  StatusBar,
  Platform,
  ScrollView,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { configureStore } from '@reduxjs/toolkit';





export default function App() {



  return (

    <>

    
      <PersonalRouter />



      



    </>













  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    backgroundColor: "transparent",
    paddingVertical: 10,
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    color: Colours.button,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
//  import CategoriesStack from './navigation/stacks/CategoriesStack'
//import CartStack from './navigation/stacks/CartStack'
//import InventoryStack from './navigation/stacks/WholeListStack'
import PersonalRouter from './navigation/PersonalRouter';
import { Colours } from './config/colours';

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
    
    
          <PersonalRouter/>
      


        <View style={styles.footer}>
          {/* Menú de 3 botones */}
          <View style={styles.menu}>
            <Text style={styles.button}>Botón 1</Text>
            <Text style={styles.button}>Botón 2</Text>
            <Text style={styles.button}>Botón 3</Text>
          </View>
        </View>


      



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
    backgroundColor: '#3c45ab',
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
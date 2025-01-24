import Table from './pages/Table';
import Categories from './pages/Categories';
import { NavigationContainer } from '@react-navigation/native';

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
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();


export default function App() {
  return (

   

    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="home"
          component={
            <View style={styles.container}>
              <Categories />
            </View>

          }


        />

       
          <View style={styles.footer}>
            {/* Menú de 3 botones */}
            <View style={styles.menu}>
              <Text style={styles.button}>Botón 1</Text>
              <Text style={styles.button}>Botón 2</Text>
              <Text style={styles.button}>Botón 3</Text>
            </View>
          </View>

      </Stack.Navigator>
    </NavigationContainer>















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
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
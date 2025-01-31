
import PersonalRouter from './navigation/PersonalRouter';
import { Colours } from './config/colours';
import CategoriesStack from './navigation/stacks/CategoriesStack';

import {
  NavigationContainer,
  ThemeProvider,
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
import { Provider } from 'react-redux';
import { store } from './store/index.js';
import Counter from './components/Counter';

import Signup from './navigation/screens/signup/Signup';



export default function App() {



  return (

    <>
    
     <Provider store={store}>
     <PersonalRouter />
 

  </Provider>
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
{/*        



*/ }

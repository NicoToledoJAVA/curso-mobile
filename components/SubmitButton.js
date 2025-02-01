import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Colours } from '../config/colours'
import { LinearGradient } from 'expo-linear-gradient';

const SubmitButton = ({ title, onPress }) => {
  return (
    <LinearGradient
      colors={['#0074e4', '#003366']} // Simula el gradient de fondo
      style={styles.gradientBackground}
    >
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </LinearGradient>
  )
}

export default SubmitButton

const styles = StyleSheet.create({
  gradientBackground: {
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#003366',
    shadowColor: '#666666',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5, // Para sombra en Android
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10, 
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center', // Antes estaba mal escrito como "enter"
  },
  text: {
    fontFamily: 'Courier New', // Funciona en iOS, en Android puede necesitar carga
    color: '#ffffff',
    fontSize: 20, // Reducido de 35 a 20 para mejor visualización
    textShadowColor: '#666666',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
})

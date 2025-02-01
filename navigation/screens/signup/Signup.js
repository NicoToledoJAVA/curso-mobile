import { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import InputForm from '../../../components/InputForm';
import SubmitButton from '../../../components/SubmitButton';
import { Colours } from '../../../config/colours';
import {
  useSignUpMutation,
} from '../../../services/auth';
import { signupSchema } from '../../../validations/signUpSchema'
import { setUser } from '../../../contexts/userSlice';

const Signup = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState("")
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [triggerSingUp] = useSignUpMutation();

  const onSubmit = async () => {
    try {
      
      signupSchema.validateSync({ email, password, confirmPassword });
  
     
      const response = await triggerSingUp({ email, password });
      
  
     
      if (response?.data) {
        const user = {
          email: response.data.email,
          idToken: response.data.idToken,
          localId: response.data.localId,
        };
  
        dispatch(setUser(user));
      } else {
        console.error("Sign up failed. No response data.");
      }
  
    } catch (error) {
      console.log(error);
     
      switch (error.path) {
        case "email":
          setEmailError(error.message);
          break;
        case "password":
          setPasswordError(error.message);
          break;
        case "confirmPassword":
          setConfirmPasswordError(error.message);
          break;
        default:
          console.error("An unexpected error occurred");
      }
    }
  };

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.title} >Registrarme</Text>
        <InputForm
          label="Email"
          value={email}
          onChangeText={(t) => setEmail(t)}
          isSecure={false}
          error={emailError}
        />
        <InputForm
          label="Password"
          value={password}
          onChangeText={(t) => setPassword(t)}
          isSecure={true}
          error={passwordError}
        />
        <InputForm
          label="Confirmar password"
          value={confirmPassword}
          onChangeText={(t) => setConfirmPassword(t)}
          isSecure={true}
          error={confirmPasswordError}

        />
        <SubmitButton title="Registrarme" onPress={onSubmit}
        />
        <Text style={styles.sub}>Ya estás registrado?</Text>
        <Pressable onPress={() => navigation.navigate("Login")} >
          <Text style={styles.subLink}>Login</Text>
        </Pressable>
      </View>
    </View>
  )
}


export default Signup


const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    width: "90%",
    backgroundColor: "black",
    gap: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20
  },
  title: {
    fontSize: 22,
    fontFamily: "Lobster",
    color: Colours.lightGray
  },
  sub: {
    fontSize: 14,
    fontFamily: "Josefin",
    color: Colours.lightGray
  },
  subLink: {
    backgroundColor: Colours.accent,
    fontSize: 18,
    fontFamily: "Josefin",
    color: Colours.lightGray
  }
})
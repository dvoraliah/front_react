import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native'
import Logo from "../../../assets/images/orgabud_with_title.png";
import CustomInput from '../../components/CustomInput/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import SocialSignInButtons from "../../components/SocialSignInButtons";
import { API } from '../../services/env';
import { useNavigation } from '@react-navigation/native'
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = () => {
  const [email, setEmail]= useState('');
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const {height} = useWindowDimensions();
  const navigation = useNavigation();
  const saveToken =  async ( token ) => {
    try {
      // console.warn(token);
      AsyncStorage.setItem("token", token);
      navigation.navigate('Home')
    } catch (error) {
      // console.warn(error)
    }
  };

  
  const onSignInPress = () => {
    //Valider l'utilisateur
    // Definir le lui de connection d'Axios
    const URI = API + "login";
      //Verifier que l'utilisateur est bien enregistrer
      axios({
        method: "post",
        url: URI,
        data: {
          email: email,
          password: password,
        },
      }).then((response) => {
        //Si la response à la requête est acceptée par l'API, l'utilisateur est redirigé vers la page d'accueil.
        // console.warn(state)        
        response.status == 201
          ? saveToken(
              response.data.token
            ) /* navigation.navigate('Home', {
            token : response.data.token,
          })  */
          : {};
        
      });
  }

  const onForgotPassPress = () => {
    navigation.navigate("ForgotPassWord");
  };
  const onNewAccountPress = () => {
    navigation.navigate("SignUp");
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />
        <CustomInput placeholder={"Email"} value={email} setValue={setEmail} />
        <CustomInput
          placeholder={"Mot de Passe"}
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />
        <CustomButton onPress={onSignInPress} text={"Se connecter"} />

        <CustomButton
          onPress={onForgotPassPress}
          text={"Mot de passe oublié ?"}
          type="TERTIARY"
        />

        {/* <SocialSignInButtons /> */}


      </View>
    </ScrollView>
  );
}

export default SignInScreen

const styles = StyleSheet.create({
  root: {
    padding: 10,
    backgroundColor: "#f5b7b1",
  },
  logo: {
    width: "100%",
    maxWidth: 250,
    height: "100%",
    maxHeight: 250,
    marginBottom: 50,
  },
});
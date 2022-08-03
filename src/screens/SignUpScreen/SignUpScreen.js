import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import SocialSignInButtons from '../../components/SocialSignInButtons'
import { useNavigation } from '@react-navigation/native'
import { API, USER_ID, USER_TOKEN } from "../../services/env"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUpScreen = () => {
    const [username, setUsername]= useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigation = useNavigation();
    
  const onSignUpPress = async () => {
    const URI = API + "register";
    console.log(URI)
    const response = await axios({
      method: "post",
      url: URI,
      data: {
        name: username,
        email: email,
        password: password,
        password_confirmation: confirmPassword,
      },
    }).then(function (response) {
      AsyncStorage.setItem("token", response.data.token);
      AsyncStorage.setItem("user_id", response.data.donnees.id.toString());
      navigation.navigate('Home');
    });  
  // console.warn("Enregistrer "+ username + " " + email + " " + password + " " + confirmPassword)
  }


    const onAlreadyRegisterPress = () => {
      navigation.navigate("SignIn");
    };

    const OnPressUsePolicy = () => {
      console.warn("Use Policy");
    }

    const OnPressPrivacyPolicy = () => {
      console.warn("Privacy Policy");
    };

    return (
      <ScrollView>
        <View style={styles.root}>
          <Text style={styles.title}>Créer un compte</Text>
          <CustomInput
            placeholder={"Pseudo"}
            value={username}
            setValue={setUsername}
          />
          <CustomInput
            placeholder={"Email"}
            value={email}
            setValue={setEmail}
          />
          <CustomInput
            placeholder={"Mot de Passe"}
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
          />
          <CustomInput
            placeholder={"Confirmer le Mot de Passe"}
            value={confirmPassword}
            setValue={setConfirmPassword}
            secureTextEntry={true}
          />
          <CustomButton onPress={onSignUpPress} text={"S'enregistrer"} />

          <Text style={styles.text}>
            En vous enregistrant, vous acceptez la{' '}
            <Text style={styles.link} onPress={OnPressUsePolicy}>politique d'utilisation</Text> ainsi que la{' '}
            <Text style={styles.link} onPress={OnPressPrivacyPolicy}>politique de confidentialité</Text> d'OrgaBud
          </Text>

          {/* <SocialSignInButtons /> */}
          <CustomButton
            onPress={onAlreadyRegisterPress}
            text={"Déjà inscrit ? Connectez-vous"}
            type="TERTIARY"
          />
        </View>
      </ScrollView>
    );
}

export default SignUpScreen

const styles = StyleSheet.create({
  root: {
    padding: 10,
    alignItems: "center",
  },
  title: {
    textTransform: "capitalize",
    fontSize: 24,
    fontWeight: "bold",
    margin: 10,
  },
  text: {
    color: "#5b712c",
    marginVertical: 10,
    fontWeight: "200",
  },
  link: {
    color: "#5b712c",
    fontWeight: "normal",
  },
});
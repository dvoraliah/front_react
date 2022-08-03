import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import SocialSignInButtons from '../../components/SocialSignInButtons'
import { useNavigation } from '@react-navigation/native'

const SignUpScreen = () => {
    const [username, setUsername]= useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigation = useNavigation();
    
    const onSignUpPress = () => {
        
        navigation.navigate("ConfirmEmail")
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
    // backgroundColor: "#f5b7b1",
  },
  title: {
    textTransform: "capitalize",
    fontSize: 24,
    fontWeight: "bold",
    margin: 10,
  },
  text: {
    color: "#fff",
    marginVertical: 10,
  },
  link: {
    color: "salmon",
  },
});
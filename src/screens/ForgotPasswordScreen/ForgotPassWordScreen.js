import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import { useNavigation } from "@react-navigation/native";
import { API } from "../../services/env";
import axios from "axios";
import CustomRedirectAlert from "../../components/CustomRedirectAlert"


const URI = API + "isRegister";

const ForgotPassWordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  
  const onResetPassword = () => {
    //Verification en bdd si l'email est existant en base de donnée.
    axios({
      method: "post",
      url: URI,
      data: {
        email: email,
      },
    })
      .then((response) => {
        //Si l'email est en BDD je stocke le code dans la sessionStorage et j'envoie l'utilisateur vers la page de validation. sinon je renvois un message SessionStorage Ne fonctionne pas sur mobile, regarder sql lite ou rajouter une table en bdd comprennat l'id uuser et le code généré//TODOle placer en bdd plutot que dans la session et envoyer un mail à l'utilisateur contenant le code.
        response.data.Resultat
          ? /* sessionStorage.setItem(
              "codeReset",
              JSON.stringify(response.data.Resultat)
            ) */ console.log("ok")
          : {};
        response.data.Resultat
          ? navigation.navigate("NewPassWord")
          :  Alert.alert("Aucune Correspondance", "Email introuvable", [
          {
            text: "S'enregistrer",
            onPress: () => navigation.navigate("SignUp"),
          },
          {
            text: "Annuler",
            onPress: () => console.warn("exit"),
            style: "cancel",
          },
        ]);
      })
      .catch((error) => console.log(error));
    
  };

  const onBackToSignInPress = () => {
    navigation.navigate("SignIn");
  }

  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={styles.title}>Renvoyer le Mot de Passe</Text>

        <CustomInput 
          placeholder={"Email"} 
          value={email} 
          setValue={setEmail} 
          />

        <CustomButton onPress={onResetPassword} text={"Réinitialiser le mot de passe"} />

        <CustomButton
          onPress={onBackToSignInPress}
          text={"Retour à la connexion"}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

export default ForgotPassWordScreen;

const styles = StyleSheet.create({
  root: {
    padding: 10,
    alignItems: "center",
  },
  title: {
    textTransform: "uppercase",
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

// Alert.alert("Aucune Correspondance", "Email introuvable", [
//   {
//     text: "S'enregistrer",
//     onPress: () => navigation.navigate("SignUp"),
//   },
//   {
//     text: "Annuler",
//     onPress: () => console.warn("exit"),
//     style: "cancel",
//   },
// ]);
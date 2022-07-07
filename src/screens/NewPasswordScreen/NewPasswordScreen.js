import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import { useNavigation } from "@react-navigation/native";

const NewPasswordScreen = () => {
  const navigation = useNavigation();
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //Pour l'instant j'affiche ma sessionStorage pour voir le code et le valider
  console.log(sessionStorage.codeReset);
  const onNewPassword = () => {
    sessionStorage.codeReset == '"' + code + '"'
      ? console.log("ok")
      : console
          .log(sessionStorage.codeReset)
          .catch((error) => console.log(error));
    // navigation.navigate("Home");
  };

  const onBackToSignInPress = () => {
    navigation.navigate("SignIn");
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={styles.title}>Redéfinir le mot de passe</Text>

        <CustomInput placeholder={"Code"} value={code} setValue={setCode} />
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

        <CustomButton
          onPress={onNewPassword}
          text={"Redefinir le mot de passe"}
        />

        <CustomButton
          onPress={onBackToSignInPress}
          text={"Retour à la connexion"}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

export default NewPasswordScreen;

const styles = StyleSheet.create({
  root: {
    padding: 10,
    alignItems: "center",
    backgroundColor: "#f5b7b1",
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
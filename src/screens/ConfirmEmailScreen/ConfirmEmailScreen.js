import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import { useNavigation } from "@react-navigation/native";

const ConfirmEmailScreen = () => {
    const [email, setEmail] = useState("");
    const [confirmCode, setConfirmCode] = useState("");
    const navigation = useNavigation();
    const onConfirmPress = () => {
        navigation.navigate("Home");
        
    }

    const onBackToSignInPress = () => {
      navigation.navigate("SignIn");
    };

    const onResendPress = () => {
      console.warn("Renvoyer l'email");
    };


    return (
      <ScrollView>
        <View style={styles.root}>
          <Text style={styles.title}>Confirmer votre email</Text>

          <CustomInput
            placeholder={"Email"}
            value={email}
            setValue={setEmail}
          />
          <CustomInput
            placeholder={"Entrez le code de confirmation"}
            value={confirmCode}
            setValue={setConfirmCode}
            secureTextEntry={true}
          />

          <CustomButton onPress={onConfirmPress} text={"Confirmer mon email"} />

          <CustomButton
            onPress={onResendPress}
            text={"Renvoyer l'email"}
            type="SECONDARY"
          />
          <CustomButton
            onPress={onBackToSignInPress}
            text={"Retour à la connexion"}
            type="TERTIARY"
          />
        </View>
      </ScrollView>
    );
}

export default ConfirmEmailScreen;

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
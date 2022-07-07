import React from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import { useNavigation } from "@react-navigation/native";


const CustomRedirectAlert = (title, message, button1, fnButton1) => {
    //
    

  const noMatch = () =>{

    Alert.alert(title, message, [
      {
        text: button1,
        onPress: () => fnButton1,
      },
      {
        text: "Annuler",
        onPress: () => console.warn("exit"),
        style: "cancel",
      },
    ]);}
  return (
    noMatch()
  )
}

export default CustomRedirectAlert;

const styles = StyleSheet.create({})

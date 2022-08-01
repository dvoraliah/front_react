import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ConfirmEmailScreen from "../screens/ConfirmEmailScreen";
import ForgotPassWordScreen from "../screens/ForgotPasswordScreen";
import NewPasswordScreen from "../screens/NewPasswordScreen";
import HomeScreen from "../screens/HomeScreen";
import CategorieScreen from "../screens/CategorieScreen"
import NewEntryBudgetScreen from '../screens/NewEntryBudgetScreen/NewEntryBudgetScreen';
const Stack = createNativeStackNavigator();


const Navigation = () => {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#f5b7b1",
    },
  };
    return (
      <NavigationContainer theme={MyTheme} style={styles.root}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
          <Stack.Screen name="ForgotPassWord" component={ForgotPassWordScreen} />
          <Stack.Screen name="NewPassWord" component={NewPasswordScreen} /> 
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Categorie" component={CategorieScreen} />*/}
          <Stack.Screen name="NewEntry" component={NewEntryBudgetScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
}

export default Navigation

const styles = StyleSheet.create({
  root: {
    padding: 10,
    backgroundColor: "#f5b7b1",
  },
});

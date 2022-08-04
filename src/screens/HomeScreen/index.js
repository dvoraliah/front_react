import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { API, USER_TOKEN } from "../../services/env";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


const HomeScreen = ({route }) => {
  const { username } = route.params;
  const monthString = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];
  const [actualMonth, setMonth] = useState(new Date().getMonth());
  const [actualYear, setYear] = useState(new Date().getFullYear());
  const [dataCategories, setDataCategories] = useState([]);
  const navigation = useNavigation();
  const URI = API + "categories"
  const goBackSignPress = async () => {
    AsyncStorage.setItem('token', "")
    AsyncStorage.setItem("user_id", "");
    navigation.navigate("SignIn")
  };
  const categorieOnPress = (name, slug, id) => {
    navigation.navigate("Categorie", {
      categorieName: name, slug: slug, categorieId : id
    });
  }
  
  const getCategories = async() => {
    const token = await AsyncStorage.getItem("token");
    
    const response = await axios({
      method: "get",
      url: URI,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch(function (error) {
      console.log(error);
    }).then(function(response){
      setDataCategories(response.data)
    });
    
  }
  
  // getToken()
  useEffect(() => {
    getCategories()
  }, [])
  
    return (
      <View style={styles.root}>
        <Text style={{ fontSize: 24, alignContent: "center" }}>
          Bienvenue {username}

        </Text>
        <CustomButton onPress={goBackSignPress} text={"Déconnexion"} />
        <Text style={{ fontSize: 20, alignContent: "center" }}>Catégories</Text>

        {
        dataCategories.map((categorie) => {
          if(categorie.slug == "resume"){
            return (
              <CustomButton
                key={categorie.slug.toString()}
                onPress={() =>
                  navigation.navigate("Resume", {dataCategories})
                }
                text={categorie.name +" "+ monthString[actualMonth] + " " + actualYear}
                fgColor="#5b712c"
                type="RESUME"
              />
            );
          }
              
        })}
        {dataCategories.map((categorie) => {
          if(categorie.slug != "resume"){
            return (
              <CustomButton
                key={categorie.slug.toString()}
                onPress={() =>
                  categorieOnPress(categorie.name, categorie.slug, categorie.id)
                }
                text={categorie.name}
              />
            );
          }
              
        })}
      </View>
    );
}

export default HomeScreen
const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
});

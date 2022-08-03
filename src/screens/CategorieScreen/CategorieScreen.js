import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet} from 'react-native'
import CustomButton from '../../components/CustomButton';
import { useNavigation } from "@react-navigation/native";
import { API, USER_TOKEN} from "../../services/env";
import axios from "axios";
import CustomTable from "../../components/CustomTable";



const CategorieScreen = ({route}) => {
  const { categorieName, slug, categorieId } = route.params;
  // console.log(categorieId)
  // const [FIELDS, SETFIELDS] = useState([])
  const [BUDGETS, SETBUDGETS] = useState([])


  const BUDGETSDetail = async () => {
    const token = await USER_TOKEN;
    // console.warn(USER_TOKEN)
    const URI = API + "budgets";
    const response = await axios({
      method: "get",
      url: URI,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(function (response) {
      SETBUDGETS(response.data);
    });
  };

  useEffect( () => {
    // FIELDSDetail();
    BUDGETSDetail();
  }, []);
// BUDGETSDetail();  
// console.log(BUDGETS)


const navigation = useNavigation();
    return (
      <View>
        <Text style={styles.title}>Accueil categorie {categorieName}</Text>
        <CustomButton
          onPress={() => {
            navigation.navigate("Home");
          }}
          text="Retour à l'Accueil"
        />

        {/* {console.log(FIELDS)} */}
        <CustomTable budgets={BUDGETS} idCategorie= {categorieId} categorieName = {categorieName} slugCategorie={slug}/>
      </View>
    );
}

export default CategorieScreen

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
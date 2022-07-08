import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet} from 'react-native'
import CustomButton from '../../components/CustomButton';
import { useNavigation } from "@react-navigation/native";
import { API, USER_TOKEN } from "../../services/env";
import axios from "axios";
import CustomTable from "../../components/CustomTable";



const CategorieScreen = ({route}) => {
  const { categorieName, slug } = route.params;
  const [FIELDS, SETFIELDS] = useState([])
  const [BUDGETS, SETBUDGETS] = useState([])
  const FIELDSDetail = async (arg) => {
    const token = await USER_TOKEN
    const URI = API +  slug +  "/fields"
    const response = await axios({
      method: "get",
      url: URI,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(function (response) {
      SETFIELDS(response.data.champs);
    });
  }

  const BUDGETSDetail = async () => {
    const token = await USER_TOKEN;
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
    FIELDSDetail();
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

        {
          // console.log(FIELDS)

          FIELDS.map((field) => {
            return (
              // console.log(field)
              <Text key={field.slug.toString()} style={styles.text}>
                {field.name}
              </Text>
            );
          })
        }
        {/* {console.log(BUDGETS)} */}
        <CustomTable object={FIELDS} budgets={BUDGETS} />
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
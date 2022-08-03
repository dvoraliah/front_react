import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet} from 'react-native'
import CustomButton from '../../components/CustomButton';
import { useNavigation } from "@react-navigation/native";
import { API, USER_TOKEN} from "../../services/env";
import axios from "axios";
import CustomTable from "../../components/CustomTable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import moment from "moment";



const CategorieScreen = ({route}) => {
  // console.warn(USER_TOKEN)
  const [actualMonth, setActualMonth] = useState(moment().format("MMMM"));
  const { categorieName, slug, categorieId } = route.params;
  // console.log(categorieId)
  // const [FIELDS, SETFIELDS] = useState([])
  const [BUDGETS, SETBUDGETS] = useState([])
    const leftIcon = <Icon name="caret-left" size={30} color="red" />;
    const rightIcon = <Icon name="caret-right" size={30} color="red" />;

  const BUDGETSDetail = async () => {
    const token = await AsyncStorage.getItem("token");
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
        <Text style={styles.title}>
          {/* <CustomButton
            onPress={""}
            text={leftIcon}
          /> */}
          {actualMonth}
          {/* <CustomButton
            onPress={""}           
            text={rightIcon}
          /> */}
        </Text>
        <CustomTable
          budgets={BUDGETS}
          idCategorie={categorieId}
          categorieName={categorieName}
          slugCategorie={slug}
        />
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
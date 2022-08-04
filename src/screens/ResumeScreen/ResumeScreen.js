import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, Link} from 'react-native'
import CustomButton from '../../components/CustomButton';
import { useNavigation } from "@react-navigation/native";
import { API, USER_TOKEN} from "../../services/env";
import axios from "axios";
import CustomTableResume from "../../components/CustomTableResume";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import moment from "moment";



const CategorieScreen = ({route}) => {
  const categories = route.params
  /* Variables pour la navigations entre les mois */
  const monthString = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"]
  const [actualMonth, setMonth] = useState(new Date().getMonth());
  const [actualYear, setYear] = useState(new Date().getFullYear());
  const [username, setUsername] = useState('')
  const [BUDGETS, SETBUDGETS] = useState([]);
  const changeMonth = (type) => {
    if(type == "ADD"){
      if (actualMonth < 11) {
        setMonth(actualMonth + 1);
        
      } else {
        setMonth(0);
        setYear(actualYear + 1);
      }
    }
    if (type == "SUBT") {
      if (actualMonth > 0) {
        setMonth(actualMonth - 1);
      }else {
        setMonth(11)
        setYear(actualYear - 1);
      }
    }
    
    
  }


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
      setUsername(response.data[0].user.name)
    });
  };
  useEffect( () => {
    BUDGETSDetail();
  }, []);


const navigation = useNavigation();
    return (
      <View>
        <Text style={styles.title}>Résumé</Text>
        <CustomButton
          onPress={() => {
            navigation.navigate("Home", {username: username});
          }}
          text="Retour aux catégories"
        />
        <CustomButton
          onPress={() => {
            setMonth(new Date().getMonth());
            setYear(new Date().getFullYear());
          }}
          text="Aujourd'hui"
          type="TERTIARY"
        />
        <View style={styles.date}>
          <Icon.Button
            name="caret-left"
            size={30}
            color="#5b712c"
            backgroundColor="#E6F8E0"
            onPress={() => changeMonth("SUBT")}
          />
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            {/* {actualMonth == 0 ? setActualMonth(12) : ""} */}
            {monthString[actualMonth] + " " + actualYear}
          </Text>
          <Icon.Button
            name="caret-right"
            size={30}
            color="#5b712c"
            backgroundColor="#E6F8E0"
            onPress={() => changeMonth("ADD")}
          />
        </View>
        <CustomTableResume
          budgets={BUDGETS}
          categories={categories.dataCategories}
          idCategorie={1}
          categorieName={"resume"}
          slugCategorie={"résumé"}
          actualMonth={actualMonth + 1}
          actualYear={actualYear}
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
  date: {
    textTransform: "uppercase",
    fontSize: 24,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection:"row",
    flexWrap: "nowrap"
  },
  text: {
    color: "#fff",
    marginVertical: 10,
  },
  link: {
    color: "salmon",
  },
});
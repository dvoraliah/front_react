import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import Checkbox from "expo-checkbox";
import DatePicker from "react-native-datepicker";
import { useNavigation, CommonActions } from "@react-navigation/native";
import axios from "axios";
import { API, USER_TOKEN, USER_ID } from "../../services/env";
import moment from "moment";
import DropDownPicker from "react-native-dropdown-picker";


const NewEntryBudgetScreen =  ({ route }) => {

  const { categorie_id, user_id } = route.params;
  const [isDebited, setChecked] = useState(false);
  const [dateExpense, setDateExpense] = useState(moment().format("DD-MM-YYYY"));
  const [fieldsList, setFieldsList] = useState([]);
  var champs = []
  const [value, setMontant] = useState('');
  const [open, setOpen] = useState(false);
  const [pickValue, setValue] = useState(null);
  const [items, setItems] = useState();
  const navigation = useNavigation();
  const [slugCategorie, setSlugCategorie] = useState('');
  const [nameCategorie, setNameCategorie] = useState('');

  const returnCategorie = () => {
    navigation.push("Categorie", {
      categorieName: nameCategorie,
      slug: slugCategorie,
      categorieId: categorie_id,
    });
  };
  const OnAddToBudgetPress = async() => {
    const token = await USER_TOKEN;
    const URI = API + "budgets";
    const response = await axios({
      method: "post",
      url: URI,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        value: value,
        field_id: pickValue,
        user_id: user_id,
        month: dateExpense.substr(3, 2),
        year: dateExpense.substr(6, 4),
      },
    }).then(function () {
      returnCategorie();
    });  
  }
  const recupCategories = async (arg) => {
    // setChamps([]);
    const token = await USER_TOKEN;
    const URI = API + "fields";
    const response = await axios({
      method: "get",
      url: URI,
      headers: {
          Authorization: `Bearer ${token}`,
        // Authorization: `Bearer 1|aIU9qWxRucCX07iauIygbsN24g1dhJjjdwduORhH`,
      },
    }).then(function async(response) {
      console.log(URI);
      
      setFieldsList(response.data);
    });
  };
  useEffect(() => {
    recupCategories();
  }, []);

    fieldsList.map((field) => {
      const index = champs.findIndex((object) => object.id === field.id);
        if(categorie_id == field.field_category_id){
          if (index === -1) {  
            if(slugCategorie == ''){
              setSlugCategorie(field.field_category.slug)
              setNameCategorie(field.field_category.name)
            }
            champs.push({label: field.name, value: field.id });
          }
      }
    });


  

  
  return (
    <ScrollView>
      <View>
        <Text>Formulaire de nouvelle entrée budget</Text>
        <DropDownPicker
          placeholder="Choisir un champs"
          open={open}
          value={pickValue}
          items={champs}
          setOpen={setOpen}
          setValue={setValue}
          // setItems={setItems}
        />
        {/* <CustomInput placeholder={"Nom du Champs"} value={""} setValue={""} /> */}
        <CustomInput
          placeholder={"Montant"}
          value={value}
          setValue={setMontant}
        />
        <Text style={styles.labelDate}>Date de Dépense</Text>
        <DatePicker
          style={styles.datePickerStyle}
          date={dateExpense} //initial date from state
          mode="date" //The enum of date, datetime and time
          placeholder="select date"
          format="DD-MM-YYYY"
          confirmBtnText="Ok"
          cancelBtnText="Annuler"
          customStyles={{
            dateIcon: {
              // display: 'none',
              position: "absolute",
              left: 0,
              // top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(date) => {
            setDateExpense(date);
          }}
        />

        <Checkbox
          style={styles.checkbox}
          value={isDebited}
          onValueChange={setChecked}
          color={isDebited ? "green" : undefined}
        />
        <Text style={styles.checkboxLabel}>Débité</Text>

        <CustomButton onPress={OnAddToBudgetPress} text={"Ajouter au budget"} />

        <CustomButton
          onPress={() => navigation.goBack()}
          text={"Annuler"}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

export default NewEntryBudgetScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
  labelDate: {
    fontWeight: "normal",
    color: "grey",
    marginTop: 5,
    marginBottom: 5,
  },
  checkbox: {
    marginTop: 10,
    marginLeft: 15,
  },
  checkboxLabel :{
      marginTop: 2,
      marginLeft: 5,
  }
});


import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import Checkbox from "expo-checkbox";
import DatePicker from "react-native-datepicker";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API, USER_TOKEN, USER_ID } from "../../services/env";
import CustomRedirectAlert from "../../components/CustomRedirectAlert";
import CustomPicker from "../../components/CustomPicker/CustomPicker";

const NewEntryBudgetScreen =  ({ route }) => {
    const { categorie_id, user_id } = route.params;
    // console.log(route.params)
    // const categorieId = 2;
  const [isDebited, setChecked] = useState(false);
  const [date, setDate] = useState(new Date());
  const [fieldsList, setFieldsList] = useState([]);
  const [champs, setChamps] = useState([]);
  const [value, setMontant] = useState('');
  const OnAddToBudgetPress = () => {
      console.warn("montant " + value, "Coché "+ isDebited, "user_id " + user_id, "categorie_id " + categorie_id)
  }

  const recupCategories = async (arg) => {
    const token = await USER_TOKEN;
    const URI = API + "fields";
    const response = await axios({
      method: "get",
      url: URI,
      headers: {
          Authorization: `Bearer ${token}`,
        // Authorization: `Bearer 1|aIU9qWxRucCX07iauIygbsN24g1dhJjjdwduORhH`,
      },
    }).then(function (response) {
      console.log(URI);
      setFieldsList(response.data);
    });
  };
  useEffect(() => {
    recupCategories();
  }, []);
  fieldsList.map((field) => {
      if(categorie_id == field.field_category_id){
    // console.log(field)
    champs.push({ label: field.name, value: field.slug });
}
  });

  // console.log(champs)
  return (
    <ScrollView>
      <View>
        <Text>Formulaire de nouvelle entrée budget</Text>
        <CustomPicker list={champs} categorieId={categorie_id} />
        {/* <CustomInput placeholder={"Nom du Champs"} value={""} setValue={""} /> */}
        <CustomInput placeholder={"Montant"} value={value} setValue={setMontant} />
        <Text style={styles.labelDate}>Date de Dépense</Text>
        <DatePicker
          style={styles.datePickerStyle}
          date={date} //initial date from state
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
            setDate(date);
          }}
        />
        <Text style={styles.labelDate}>Date de prévue du débit</Text>
        <DatePicker
          style={styles.datePickerStyle}
          date={date} //initial date from state
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
            setDate(date);
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
          onPress={""}
          text={"Retour à la connexion"}
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


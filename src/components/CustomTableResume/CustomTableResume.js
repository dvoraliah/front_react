import React, {useState, useEffect} from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import CustomButton from "../CustomButton"
import { DataTable } from "react-native-paper";
import { USER_ID, USER_TOKEN, API } from "../../services/env";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";


const optionsPerPage = [2, 3, 4];

const CustomTableResume = ({ budgets, categories, idCategorie, categorieName, slugCategorie, actualMonth, actualYear}) => {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
  const addIcon = <Icon name="plus" size={55} color="#fff" />;
  const deleteIcon = <Icon name="trash" size={30} color="red" />;

  const [user_id, setUserId] = useState("");
  const [token, setToken] = useState("");
  const navigation = useNavigation();

  var actualCategory = "";
  
  const returnCategorie = () => {
    navigation.push("Categorie", {
        categorieName: categorieName,
        slug: slugCategorie,
        categorieId: idCategorie,
    })
  };

  var totalSomme = 0;
  var revenus = 0;
  var depenses = 0;
  const fillUserValues = async () => {
    setToken(await AsyncStorage.getItem("token"));
    setUserId(await AsyncStorage.getItem("user_id"));
  }
  fillUserValues();
  
  /* Récupère les valeurs des champs pour créer le total des revenus */
  // budgets.map((budget) => {
    
  //   if ((budget.field.field_category_id == idCategorie) && (budget.month == actualMonth) && (budget.year == actualYear)) {
  //     totalSomme = (parseFloat(totalSomme) + parseFloat(budget.value))
  //   }
  // })
 

  /* Lorsque l'utilisateur appuie sur la valeur de is_debited elle change pour la valeur donnée en param (boolean), l'utilisateur est ensuite redirigé vers la page de la catégorie d'où il vient. */
  const onDebitedPress = async (id, value) => {
    const URI = API + "budgets/" + id;
    const response = await axios({
      method: "put",
      url: URI,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data:{
        is_debited: value,
      }
    }).then(function () {
      returnCategorie()
    });
  }



    

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <DataTable>


      {categories.map((categorie) => {
        if (categorie.slug != "resume") {
          var totalCateg = 0;
          return (
            <>
              <DataTable.Row>
                <DataTable.Cell>{categorie.name}</DataTable.Cell>
                {budgets.map((budget) => {
                  if (
                    budget.field.field_category_id == categorie.id &&
                    actualMonth == budget.month &&
                    actualYear == budget.year
                  ) {
                    totalCateg =
                      parseFloat(totalCateg) + parseFloat(budget.value);
                    if (categorie.id == 1) {
                      revenus = parseFloat(revenus) + parseFloat(budget.value);
                    } else {
                      depenses =
                        parseFloat(depenses) + parseFloat(budget.value);
                    }
                  }
                  {
                  }
                })}
                <DataTable.Cell numeric>{totalCateg}</DataTable.Cell>
              </DataTable.Row>
            </>
          );
        }
      })}
      {}
      <DataTable.Row style={{ borderBottomWidth: 0 }}>
        <DataTable.Cell> Total des Mouvements</DataTable.Cell>
        <DataTable.Cell
          numeric
          textStyle={
            (parseFloat(revenus) - parseFloat(depenses) < 0 )
              ? { color: "red" }
              : { color: "green" }
          }
        >
          {Math.round((parseFloat(revenus) - parseFloat(depenses))*100)/100}
        </DataTable.Cell>
      </DataTable.Row>

      <DataTable.Pagination
        page={page}
        numberOfPages={3}
        onPageChange={(page) => setPage(page)}
        label=""
        optionsPerPage={optionsPerPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        showFastPagination
        optionsLabel={"Rows per page"}
      />
    </DataTable>
  );
};
export default CustomTableResume;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    color: "white",
    width: "100%",
    borderColor: "salmon",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  center_cell: {
    color: "black",
    fontStyle: "italic",
  },
  align: {
    marginTop: 20,
    height: "150%",
  },
  title: {
    textAlign: "center",
    fontSize : 30
  }
});
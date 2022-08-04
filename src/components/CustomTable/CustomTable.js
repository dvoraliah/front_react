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

const CustomTable = ({ budgets, idCategorie, categorieName, slugCategorie, actualMonth}) => {

  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
  const addIcon = <Icon name="plus" size={55} color="#fff" />;
  const deleteIcon = <Icon name="trash" size={30} color="red" />;

  const [user_id, setUserId] = useState("");
  const [token, setToken] = useState("");
  const navigation = useNavigation();
  const returnCategorie = () => {
    navigation.push("Categorie", {
        categorieName: categorieName,
        slug: slugCategorie,
        categorieId: idCategorie,
    })
  };
  var totalSomme = 0;
  const fillUserValues = async () => {
    setToken(await AsyncStorage.getItem("token"));
    setUserId(await AsyncStorage.getItem("user_id"));
  }
  fillUserValues();

  /* Récupère les valeurs des champs pour créer le total des revenus */
  budgets.map((budget) => {
    if ((budget.field.field_category_id == idCategorie) && (budget.month == actualMonth)) {
      totalSomme = (parseFloat(totalSomme) + parseFloat(budget.value))
    }
  })
  /* Lorsque l'utilisateur appuie sur nouvelle entrée il est renvoyé vers la page d'ajout */
  const onNewEntryPress = () => {
    navigation.navigate("NewEntry", {
      user_id: user_id,
      categorie_id: idCategorie,
    });
  };

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

  /* Methode pour supprimer une ligne du budget */
  const onDeletePress = async (id) => {
      Alert.alert("Confirmer", "Voulez-vous vraiment supprimer cette valeur ? ", [
        {
          text: "Oui",
          onPress: async () => {
            const URI = API + "budgets/" + id;
            const response = await axios.delete(URI, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then(function () {
                returnCategorie();
              });
          },
        },
        {
          text: "Non",
          onPress: "",
          style: "cancel",
        },
      ]);
  };

  const onValuePress = (id) =>{
    Alert.prompt("Saisir la nouvelle valeur", "", [
      {
        text: "Annuler",
        onPress: () => {""},
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async (value) => {
          const URI = API + "budgets/" + id;
          const response = await axios({
            method: "put",
            url: URI,
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: {
              value: value,
            },
          }).then(function () {
            returnCategorie();
          });
        },
      },
    ]);
  }


    

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Date</DataTable.Title>
        <DataTable.Title numeric>Achat</DataTable.Title>
        <DataTable.Title numeric>Montant</DataTable.Title>
        <DataTable.Title numeric>
          {idCategorie == 1 ? "Encaissé" : "Débité"}
        </DataTable.Title>
        <DataTable.Title numeric>Suppr</DataTable.Title>
      </DataTable.Header>

      {budgets.map((budget) => {

        if ((budget.field.field_category_id == idCategorie) && (budget.month == actualMonth)) {
          return (
            <>
              <DataTable.Row key={budget.id}>
                <DataTable.Cell>
                  {budget.month + "/" + budget.year}
                </DataTable.Cell>
                <DataTable.Cell
                  textStyle={styles.align}
                  key={budget.id + budget.field_id}
                >
                  <CustomButton
                    onPress={() => {
                      "";
                    }}
                    text={budget.field.name}
                    type={"CELL"}
                  />
                </DataTable.Cell>
                <DataTable.Cell key={budget.id + budget.value} numeric>
                  <CustomButton
                    onPress={() => onValuePress(budget.id)}
                    text={budget.value}
                    type={"CELL"}
                  />
                </DataTable.Cell>
                <DataTable.Cell key={budget.id + budget.is_debited} numeric>
                  <CustomButton
                    onPress={() =>
                      onDebitedPress(budget.id, budget.is_debited == 1 ? 0 : 1)
                    }
                    text={budget.is_debited == 1 ? "Oui" : "Non"}
                    type={"CELL"}
                  />
                </DataTable.Cell>
                <DataTable.Cell key={budget.id + " delete"} numeric>
                  <CustomButton
                    onPress={() => onDeletePress(budget.id)}
                    text={deleteIcon}
                    type={"DELETE"}
                  />
                </DataTable.Cell>
              </DataTable.Row>
            </>
          );
        }
      })}
      <DataTable.Row style={{ borderBottomWidth: 0 }}>
        <DataTable.Cell>
          {" "}
          Total des {idCategorie == 1 ? "Revenus" : "Depense"}
        </DataTable.Cell>
        <DataTable.Cell numeric>{totalSomme}</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row style={{ borderBottomWidth: 0 }}>
        <DataTable.Cell
          textStyle={{
            marginRight: "auto",
            marginLeft: "auto",
            marginTop: 50,
            height: 70,
            width: 70,
          }}
        >
          <CustomButton onPress={onNewEntryPress} text={addIcon} type={"ADD"} />
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
export default CustomTable;

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
import React, {useState, useEffect} from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import CustomButton from "../CustomButton"
import { DataTable } from "react-native-paper";
import { USER_ID, USER_TOKEN, API } from "../../services/env";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";


const optionsPerPage = [2, 3, 4];

const CustomTable = ({ budgets, idCategorie}) => {
  
  // console.log(idCategorie)
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
  const [user_id, setUserId] = useState("");
  const navigation = useNavigation();
  var totalSomme = 0;
  const getUserId = async() => {
    setUserId(await USER_ID);
    // console.log(user_id);
  }
  getUserId();

  budgets.map((budget) => {
    if (budget.field.field_category_id == idCategorie) {
      totalSomme = (parseFloat(totalSomme) + parseFloat(budget.value))
    }
  })
  const onNewEntryPress = async () => {
    setUserId(await USER_ID);
    navigation.navigate("NewEntry", {
      user_id: user_id,
      categorie_id: idCategorie,
    });
  };

  const onDebitedPress = async (id, value) => {
    // console.warn(id)
    const token = await USER_TOKEN;
    const URI = API + "budgets/" + id;
    //FAIRE LE RELOAD DE LA PAGE
    const response = await axios({
      method: "put",
      url: URI,
      headers: {
        Authorization: `Bearer ${token}`,
        // Authorization: `Bearer 1|aIU9qWxRucCX07iauIygbsN24g1dhJjjdwduORhH`,
      },
      data:{
        is_debited: value,
      }
    }).then(function async(response) {
      console.warn(URI);
    });
  }

    

  useEffect(() => {
    
    setPage(0);
  }, [itemsPerPage]);

  // console.log(user_id)
  return (
    <DataTable>
      <DataTable.Header>
        {/* <DataTable.Title>Date</DataTable.Title> */}
        <DataTable.Title>Achat</DataTable.Title>

        <DataTable.Title numeric>Montant</DataTable.Title>

        <DataTable.Title numeric>Débité</DataTable.Title>

        <DataTable.Title numeric>Suppr</DataTable.Title>
      </DataTable.Header>

      {budgets.map((budget) => {
        if (budget.field.field_category_id == idCategorie) {
          return (
            <>
              <DataTable.Row key={budget.id}>
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
                    onPress={() => {
                      console.warn("pouet");
                    }}
                    text={budget.value}
                    type={"CELL"}
                  />
                </DataTable.Cell>
                <DataTable.Cell key={budget.id + budget.is_debited} numeric>
                  <CustomButton
                    onPress={() => onDebitedPress(budget.id, budget.is_debited == 1 ? 0 : 1)}
                    text={budget.is_debited == 1 ? "Oui" : "Non"}
                    type={"CELL"}
                  />
                </DataTable.Cell>
                <DataTable.Cell key={budget.id + " delete"} numeric>
                  <CustomButton
                    onPress={() => {
                      console.warn("pouet");
                    }}
                    text={"X"}
                    // type={"CELL"}
                  />
                </DataTable.Cell>
              </DataTable.Row>
            </>
          );
        }
      })}
      <DataTable.Row>
        <DataTable.Cell>
          {" "}
          Total des {idCategorie == 1 ? "Revenus" : "Depense"}
        </DataTable.Cell>
    <DataTable.Cell numeric>{totalSomme}</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell numeric></DataTable.Cell>
        <DataTable.Cell>
          <CustomButton onPress={onNewEntryPress} text={"Nouvelle entrée"} />
        </DataTable.Cell>
        <DataTable.Cell numeric></DataTable.Cell>
      </DataTable.Row>

      <DataTable.Pagination
        page={page}
        numberOfPages={3}
        onPageChange={(page) => setPage(page)}
        label="1-2 of 6"
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
    fontStyle: "italic"
  },
  align: {
    marginTop: 20,
    height: '150%',
  },
});
import React, {useState, useEffect} from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import CustomButton from "../CustomButton"
import { DataTable } from "react-native-paper";

const optionsPerPage = [2, 3, 4];

const CustomTable = ({ budgets, idCategorie}) => {
  
  // console.log(idCategorie)
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  
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
          console.log(budget);
          return (
            <>
              <DataTable.Row key={budget.id}>
                <DataTable.Cell
                  textStyle={styles.align}
                  key={budget.id + budget.field_id}
                >
                  <CustomButton
                    onPress={() => {
                      console.warn("achat");
                    }}
                    text={budget.field.name}
                    type={"CELL"}
                  />
                </DataTable.Cell>
                <DataTable.Cell key={budget.id + budget.value} numeric>
                  <CustomButton
                    onPress={() => {
                      console.warn("montant");
                    }}
                    text={budget.value}
                    type={"CELL"}
                  />
                </DataTable.Cell>
                <DataTable.Cell key={budget.id + budget.is_debited} numeric>
                  <CustomButton
                    onPress={() => {
                      console.warn("débité");
                    }}
                    text={budget.is_debited}
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
        <DataTable.Cell numeric></DataTable.Cell>
        <DataTable.Cell>
          <CustomButton
            onPress={() => {
              console.warn("New");
            }}
            text={"Nouvelle entrée"}
          />
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
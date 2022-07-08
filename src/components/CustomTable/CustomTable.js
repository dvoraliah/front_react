import React, {useState, useEffect} from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import CustomButton from "../CustomButton"
import { DataTable } from "react-native-paper";

const optionsPerPage = [2, 3, 4];

const CustomTable = ({object, budgets}) => {

  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  
  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Suppr</DataTable.Title>
        {/* <DataTable.Title>Date</DataTable.Title> */}
        <DataTable.Title>Achat</DataTable.Title>

        <DataTable.Title>Montant</DataTable.Title>

        <DataTable.Title>Débité</DataTable.Title>
      </DataTable.Header>

        {budgets.map((budget) => {
          console.log(budget.id);
          console.log(object)
          
          return (
            <>
              <DataTable.Row key={budget.id}>
                <DataTable.Cell key={budget.id + " delete"}>
                  <CustomButton
                    onPress={() => {
                      console.warn("pouet");
                    }}
                    text={"X"}
                    // type={"TERTIARY"}
                  />
                </DataTable.Cell>
                {/* <DataTable.Cell key={budget.id + budget.created_at}>
                  Date
                </DataTable.Cell> */}
                <DataTable.Cell key={budget.id + budget.field_id}>
                  <CustomButton
                    onPress={() => {
                      console.warn("achat");
                    }}
                    text={budget.field_id}
                    type={"SECONDARY"}
                  />
                </DataTable.Cell>
                <DataTable.Cell key={budget.id + budget.value}>
                  <CustomButton
                    onPress={() => {
                      console.warn("montant");
                    }}
                    text={budget.value}
                    type={"SECONDARY"}
                  />
                </DataTable.Cell>
                <DataTable.Cell key={budget.id + budget.is_debited}>
                  <CustomButton
                    onPress={() => {
                      console.warn("débité");
                    }}
                    text={budget.is_debited}
                    type={"SECONDARY"}
                  />
                </DataTable.Cell>
              </DataTable.Row>
            </>
          );
        })}
        {/* {object.map((arg) => {
          // console.log(arg)
          return (
            <>
              <DataTable.Cell>
                <CustomButton
                  onPress={() => {console.warn("pouet")}}
                  text={"X"}
                  type={"TERTIARY"}
                />
              </DataTable.Cell>

              <DataTable.Cell key={arg.id}>
                {arg.created_at.substring(0, 10)}
              </DataTable.Cell>
              <DataTable.Cell key={arg.name}>{arg.name}</DataTable.Cell>
            </>
          );
        // <DataTable.Cell>{arg.name}</DataTable.Cell>
          // <DataBase.Cell key={field.slug.toString()}></DataBase.Cell>
        })} */}
      
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
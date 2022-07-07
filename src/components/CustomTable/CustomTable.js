import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";

const CustomTable = () => {
  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Suppr</DataTable.Title>
        <DataTable.Title>Date</DataTable.Title>
        <DataTable.Title>Achat</DataTable.Title>
        <DataTable.Title numeric>Montant</DataTable.Title>
        <DataTable.Title numeric>Débité</DataTable.Title>
      </DataTable.Header>
    </DataTable>
  );
};
export default CustomTable;
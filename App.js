import React from 'react';
import { StyleSheet, Text, SafeAreaView, LogBox } from "react-native";

import Navigation from "./src/navigation"


const App = () => {
  // LogBox.ignoreLogs(["Warning: ..."]);
  LogBox.ignoreAllLogs();
  return (
    <SafeAreaView style={styles.root}>
      <Navigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#E6F8E0",
  },
});

export default App;
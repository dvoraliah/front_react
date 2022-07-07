import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';

import Navigation from "./src/navigation"

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <Navigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1, 
    backgroundColor: "#f5b7b1",  
  },
});

export default App;
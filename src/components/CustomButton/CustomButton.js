import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'

const CustomButton = ({ onPress, text, type = "PRIMARY", bgColor, fgColor}) => {
    return (
      <Pressable
        onPress={onPress}
        style={[
          styles.container,
          styles[`container_${type}`],
          bgColor ? { backgroundColor: bgColor } : {},
        ]}
      >
        <Text
          style={[
            styles.text,
            styles[`text_${type}`],
            fgColor ? { color : fgColor } : {},
          ]}
        >
          {text}
        </Text>
      </Pressable>
    ); 
}

export default CustomButton

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

  container_PRIMARY: {
    backgroundColor: "salmon",
  },
  container_SECONDARY: {
    borderColor: "salmon",
    borderWidth: 2,
  },

  container_TERTIARY: {
    borderWidth: 0,
  },
  container_CELL: {
    borderWidth: 0,
  },
  container_SOCIALCONNECT: {
    borderWidth: 0,
  },
  container_ADD: {
    backgroundColor: "green",
    borderRadius: 100,
  },
  container_DELETE: {
    borderWidth: 0,
  },

  text: {
    fontWeight: "bold",
    color: "white",
    textTransform: "uppercase",
  },
  text_SECONDARY: {
    color: "salmon",
  },

  text_TERTIARY: {
    fontWeight: "300",
    color: "#e5e7e9",
    textTransform: "none",
    fontStyle: "italic",
  },
  text_CELL: {
    fontWeight: "500",
    color: "#e5e7e9",
    textTransform: "none",
    // fontStyle: "italic",
  },
  text_DELETE: {
    fontWeight: "500",
    fontSize: 30,
    color: "red",
    textTransform: "uppercase",
    // fontStyle: "italic",
  },
});
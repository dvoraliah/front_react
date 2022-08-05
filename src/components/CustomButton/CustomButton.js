import React, {useState} from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'

const CustomButton = ({ onPress, text, type = "PRIMARY", bgColor, fgColor}) => {
  const [clicked, setClicked] = useState(false)

  const clickedButton = () => {
    
    if (clicked == false) {
      setClicked(true);
      setTimeout(() => {
        setClicked(false);
        // console.warn(clicked);
      }, 1000);
      onPress()
    }
  }
    return (
      <Pressable
        onPress={clickedButton}
        style={[
          styles.container,
          styles[`container_${type}`],
          bgColor ? { backgroundColor: bgColor } : {},
          clicked == true
            ? {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 10,
              }
            : {},
        ]}
      >
        <Text
          style={[
            styles.text,
            styles[`text_${type}`],
            fgColor ? { color: fgColor } : {},
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
    borderColor: "#5b712c",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },

  container_PRIMARY: {
    backgroundColor: "#5b712c",
  },
  container_SECONDARY: {
    borderColor: "#5b712c",
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
  container_RESUME: {
    borderColor: "#5b712c",
    borderWidth: 2,
    height: 100,
    justifyContent: "center",
  },

  text: {
    fontWeight: "bold",
    color: "white",
    textTransform: "uppercase",
  },
  text_SECONDARY: {
    color: "#0B3B0B",
  },

  text_TERTIARY: {
    fontWeight: "300",
    color: "#5b712c",
    textTransform: "none",
    fontStyle: "italic",
  },
  text_CELL: {
    fontWeight: "500",
    color: "#5b712c",
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
  text_RESUME: {
    fontSize: 25,
  },
});
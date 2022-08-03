import React, {useState} from 'react'
import { View, Text, StyleSheet} from 'react-native'
// import DropDownPicker from "react-native-dropdown-picker";


const CustomPicker = ({list, pickValue, setValue}) => {
    const [open, setOpen] = useState(false);
    // const [pickValue, setValue] = useState(null);
    const [items, setItems] = useState(list);
    //setItems(list)

    return (
      <DropDownPicker
        placeholder="Choisir un champs"
        open={open}
        value={pickValue}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
    );
}


export default CustomPicker

const styles = StyleSheet.create({
    container:{
        // alignItems: 'center',
        backgroundColor: 'white',
        width: '100%',
        borderColor: 'salmon',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginVertical: 5,

    },
    input:{

    }
})
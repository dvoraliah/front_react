import React from 'react'
import { View, Text, TextInput, StyleSheet} from 'react-native'

const CustomInput = ({ value, setValue, placeholder, secureTextEntry = false}) => {
    return (
        <View style={styles.container}>
            <TextInput 
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
        
            />
        </View>
    )
}

export default CustomInput

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
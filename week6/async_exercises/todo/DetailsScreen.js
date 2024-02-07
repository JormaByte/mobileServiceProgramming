import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";


export const DetailsScreen = ({navigation}) => {

    const [todo, setTodo] = useState('')

    return(
        <View style={Style.container}>
            <TextInput
             />
        </View>
    )
    
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20
    },
    navButton: {
        marginRight: 5,
        fontSize: 24,
        padding: 20
    },
    newTask: {
        width: '100%',
        margin: 20,
        fontSize: 18
    }
})
import React, { useState, useLayoutEffect } from "react";
import { ScrollView, View, Text, TextInput } from "react-native";
import { AntDesign } from '@expo/vector-icons'
import { StyleSheet } from "react-native";

export const DetailsScreen = ({navigation}) => {

    const [todo, setTodo] = useState('')

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: '#f0f0f0'
            },
            headerRight: () => (
                <AntDesign
                    style={Style.navButton}
                    name="plus"
                    size={24}
                    color='black'
                    onPress={() => navigation.navigate('Home', {todo: todo})}
                    />
            )
        })
    }), [todo]

    return(
        <View style={Style.container}>
            <TextInput
            style={Style.newTask}
            onChangeText={text => setTodo(text)}
            value={todo}
            placeholder="Add New Task"
        
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
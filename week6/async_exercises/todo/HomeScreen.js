import React, { useState, useLayoutEffect } from "react";
import { ScrollView, View, Text } from "react-native";
import { AntDesign } from '@expo/vector-icons'
import { StyleSheet } from "react-native";


export const HomeScreen = ({navigation}) => {

    /* creates an array with test data (strings Test1, Test2, Test3,
    etc.) and displays array data using ScrollView component. Array is printed out using
    map and index is used to set key for each row. */
    
    const [todos, setTodos] = useState
    // the _ here has no functionality, the code just requires for there to be something
    (Array(20).fill('').map((_,i) => (`Test ${i}`)))

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
                    onPress={() => navigation.navigate('Todo')}
                    />
            )
        })
    })
    return(
        <View style={Style.container}>
            <ScrollView>
                {
                    todos.map((todo, index) => (
                        <View key={index} style={Style.rowContainer}>
                            <Text style={Style.rowText}>{todo}</Text>
                        </View>
                    ))
                }
            </ScrollView>
        </View>
    )
}


const Style = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "fff",
        padding: 20
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5,
    },
    rowText: {
        fontSize: 20,
        marginLeft: 5,
    },
    navButton:{
        
    }
})
import React, { useState, useLayoutEffect, useEffect } from "react";
import { ScrollView, View, Text } from "react-native";
import { AntDesign } from '@expo/vector-icons'
import { StyleSheet } from "react-native";


export const HomeScreen = ({route, navigation}) => {

    /* creates an array with test data (strings Test1, Test2, Test3,
    etc.) and displays array data using ScrollView component. Array is printed out using
    map and index is used to set key for each row. */
    
    const [todos, setTodos] = useState
    // the _ here has no functionality, the code just requires for there to be something
    (Array(20).fill('').map((_,i) => (`Test ${i}`)))

/*read parameter passed from DetailsScreen. A new array under
name newTodos is created by combining todos (state variable) array (using spread
operator …) and new value passed from DetailsScreen. State variable is updated (and
therefore UI and list updates as well). UseEffect is executed, if there is a new route
parameter (route.params?.todo is inside square brackets) */
    useEffect(() => {
        if (route.params?.todo) {
            const newTodos = [...todos, route.params.todo]
            setTodos(newTodos)
        }
    }, [route.params?.todo])

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
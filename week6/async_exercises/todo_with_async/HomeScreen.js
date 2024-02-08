import React, { useState, useLayoutEffect, useEffect } from "react";
import { ScrollView, View, Text } from "react-native";
import { AntDesign } from '@expo/vector-icons'
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = '@todo_Key'
export const HomeScreen = ({route, navigation}) => {

    const [todos, setTodos] = useState([])

        /* creates an array with test data (strings Test1, Test2, Test3,
    etc.) and displays array data using ScrollView component. Array is printed out using
    map and index is used to set key for each row. */
/*     const [todos, setTodos] = useState
    // the _ here has no functionality, the code just requires for there to be something
    (Array(20).fill('').map((_,i) => (`Test ${i}`))) */
/* 
function, that stores value(s) to Async Storage as JSON. Function is
asynchronous and await is used to wait, that storing values is finished, before returning
back from the function */

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(STORAGE_KEY, jsonValue)
        } catch (e) {
            console.log(e);
        }
    }

    const getData = async() => {
        try {
            return AsyncStorage.getItem(STORAGE_KEY)
            .then (req => JSON.parse(req))
            .then (json => {
                if (json === null) {
                    json = []
                }
                setTodos(json)
            })
            .catch (error => console.log(error))
        } catch (e) {
            console.log(e);
        }
    }

/*read parameter passed from DetailsScreen. A new array under
name newTodos is created by combining todos (state variable) array (using spread
operator …) and new value passed from DetailsScreen. State variable is updated (and
therefore UI and list updates as well). UseEffect is executed, if there is a new route
parameter (route.params?.todo is inside square brackets) */
/*     useEffect(() => {
        if (route.params?.todo) {
            const newTodos = [...todos, route.params.todo]
            setTodos(newTodos)
        }
    }, [route.params?.todo]) */

/* useEffect to store data in JSON. Fields are key and description. Instead of
updating state variable, values are stored into Async Storage. GetData (outside if) will
then retrieve values and update state variable */

    useEffect(() => {
        //AsyncStorage.clear()
        if (route.params?.todo) {
            const newKey = todos.length + 1
            const newTodo = {key: newKey.toString(), description: route.params.todo}
            const newTodos = [...todos, newTodo]
            storeData(newTodos)
        }
        getData()
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

/* Modify rendering in a way, that values are read from JSON fields. Since key is unique,
it can be used as key for list item */

    return(
        <View style={Style.container}>
            <ScrollView>
                {
                    todos.map((todo) => (
                        <View key={todo.key} style={Style.rowContainer}>
                            <Text style={Style.rowText}>{todo.description}</Text>
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
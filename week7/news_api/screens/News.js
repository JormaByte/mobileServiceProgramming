import React, { useEffect, useState} from "react";
import { StyleSheet, View, Text, Image, ScrollView, Pressable } from "react-native";

const URL = 'https://newsapi.org/v2'
const APIKEY = '9dbc1820587b46af88b1b42c799086ed'; //YOUR OWN API KEY HERE
const criteria = 'top-headlines?country=us&ccategory=business'
const address = URL + '/' + criteria + '&apikey=' + APIKEY

export default function News() {

    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])

    useEffect(() => {
        fetch(address)
        .then(res => res.json())
        .then(
            (result) => {
                setError(null)
                setIsLoaded(true)
                setItems(result.articles)
            }, 
            (error) => {
                setError(true)
                setIsLoaded(true)
                setItems([])
            }
        )
    }, [])


    if (error) {
        return (
            <View style={styles.container}>
                <Text>{error.message}</Text>
            </View>
        )
    } 
    else if (!isLoaded) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        )
    }
    else {
        return (
            <View style={styles.container}>
                <ScrollView>
                    {items.map((item) => (
                        (item.title !== '[Removed]' && item.title !== null &&
                        item.urlToImage !== null && item.description !== null) &&
                        <View style={styles.news} key={item.title}>
                            <Text style={styles.title}>{item.title}</Text>

                            <View style={styles.imageWrapper}>
                                <Image style={styles.thumbnail} source={{uri: item.urlToImage}} />
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 0,
    }, 
    news: {
        padding: 20,
        alignItems: 'stretch',
        borderTopWidth: 2,
        borderTopColor: '#333',
    },
    imageWrapper: {
        alignItems: 'center',
    }, 
    title: {
        fontWeight: 'bold',
        marginBottom: 20,
    },
    thumbnail: {
        width: 250,
        height: 250,
    }
})
import { useEffect, useState } from "react";
import { BackHandler, StyleSheet, Text,  } from "react-native";

export default function Details({route, navigation}) {

    const [title, setTitle] = useState('')
    const [published, setPublished] = useState('')
    const [auhtor, setAuthor] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [source, setSource] = useState('')

    useEffect(() => {
        if (route.params?.news) {
           // console.log(route.params.news)
            setTitle(route.params.news.title)
            setPublished(convertDateTime(route.params.news.publishedAt))
            setAuthor(route.params.news.author)
            setImage(route.params.news.author)
            setDescription(route.params.news.description)
            setSource(route.params.news.source.name)
        }
        BackHandler.addEventListener('hardwareBackPress', close)
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', close)
        }
    }, [route.params?.news])


    /*Function for converting times from yy-mm-dd to dd.mm.yy 
    & remove seconds from time */

    const convertDateTime = (datetime) => {
        const date = datetime.split('T')[0].split('-').reverse().join('.')
        const time = datetime.split('T')[1].slice(0, -4)
        return date + ' ' + time
    }

    //Function for navigating back

    const close = () => {
        navigation.goBack(null)
        return true
    }
}




const

import { Header } from './Header';
import { Pressable, View, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useState } from 'react';
import { Footer } from './Footer';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import {
    NBR_OF_DICES,
    NBR_OF_THROWS,
    MIN_SPOT,
    MAX_SPOT,
    BONUS_POINTS_LIMIT,
    BONUS_POINTS } from '../constants/Game'

export default Home = ({navigation}) => {

    const [playerName, setPlayerName] = useState('')
    const [hasPlayerName, setHasPlayerName] = useState(false)

    const handlePlayerName = (value) => {
        if (value.trim().length > 0) {
            setHasPlayerName(true)
            Keyboard.dismiss()
        }
    }

    return (
        <>
        <Header />
        <View>
            {!hasPlayerName ?
       
            <>
            <TextInput onChangeText={setPlayerName}></TextInput>
                <Pressable onPress={() => handlePlayerName(playerName)}>
            <Text>OK</Text>
        </Pressable>
        </>
    : 
    <>
        <Text>Rules of the game:</Text>

        <Text>Good luck {playerName}</Text>
        <Text multiline='true'></Text>
        <Pressable
        onPress={() => navigation.navigate(
            'Gameboard', {player: playerName}
        )}>
            
        </Pressable>
        </>
}
            </View>
            <Footer />
            </>    
    )
}
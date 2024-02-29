import { useState, useEffect } from "react";
import { Text, View, Pressable, Container, Row } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import styles from '../styles/Style'
import { Header } from "./Header";
import { Footer } from "./Footer"
import {
  NBR_OF_DICES,
  NBR_OF_THROWS,
  MIN_SPOT,
  MAX_SPOT,
  BONUS_POINTS_LIMIT,
  BONUS_POINTS}
  from '../constants/Game'



let board = [];


export default Gameboard = ({ navigation, route}) => {

  const [playerName, setPlayerName] = useState('')
  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
  const [status, setStatus] = useState('');
  const [gameEndStatus, setGameEndStatus] = useState(false)
  const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
  const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0));
  const [selectedDicePoints, setSelectedDicePoints] = useState(new Array(MAX_SPOT).fill(false))
  const [dicePointsTotal, setDicePointsTotal] = useState(new Array(MAX_SPOT).fill(0))

useEffect(() => {
  if (playerName === '' && route.params.player) {
    setPlayerName(route.params.player)
  }
}, [])



  const DicesRow = [];
  for (let dice = 0; dice < NBR_OF_DICES; dice++) {
    DicesRow.push(
      <Pressable 
      key={"dice" + dice}
      onPress={() => selectDice(i)}>
      <MaterialCommunityIcons
        name={board[dice]}
        key={"dice" + dice}
        size={50} 
        color={getDiceColor(dice)}>
      </MaterialCommunityIcons>
    </Pressable>
    );

  }

  useEffect(() => {
    checkWinner();
    if (nbrOfThrowsLeft === NBR_OF_THROWS) {
      setStatus('Game has not started');
    }
    if (nbrOfThrowsLeft < 0) {
      setNbrOfThrowsLeft(NBR_OF_THROWS-1);
    }
  }, [nbrOfThrowsLeft]);

  function getDiceColor(i) {

      return selectedDices[i] ? "black" : "steelblue";

  }

  const selectDice = (i) => {
    if (nbrOfThrowsLeft < NBR_OF_THROWS && !gameEndStatus) {
    let dices = [...selectedDices];
    dices[i] = selectedDices[i] ? false : true;
    setSelectedDices(dices);
  }
    else{
      setStatus('Throw please')
    }}

  const checkWinner = () => {
    if (board.every((val, i, arr) => val === arr[0]) && nbrOfThrowsLeft > 0) {
      setStatus('You won');
    }
    else if (board.every((val, i, arr) => val === arr[0]) && nbrOfThrowsLeft === 0) {
      setStatus('You won, game over');
      setSelectedDices(new Array(NBR_OF_DICES).fill(false));
    }
    else if (nbrOfThrowsLeft === 0) {
      setStatus('Game over');
      setSelectedDices(new Array(NBR_OF_DICES).fill(false));
    }
    else {
      setStatus('Keep on throwing');
    }
  }

  const throwDices = () => {
    for (let i = 0; i < NBR_OF_DICES; i++) {
      if (!selectedDices[i]) {
        let randomNumber = Math.floor(Math.random() * 6 + 1);
        board[i] = 'dice-' + randomNumber;
      }
    }
    setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
  }
  
  return(
    <>
    <Header />
    <View style={styles.gameboard}>
      <Container fluid>
        <Row>{DicesRow}</Row>
      </Container>
      <Pressable style={styles.button}>

      </Pressable>
    </View>
    </>
  )
}
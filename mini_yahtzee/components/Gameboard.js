import { useState, useEffect } from "react";
import { Text, View, Pressable, ScrollView, Button } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import styles from '../styles/Style'
import { Container, Col, Row } from "react-native-flex-grid";
import { Header } from "./Header";
import { Footer } from "./Footer";
import {
  NBR_OF_DICES,
  NBR_OF_THROWS,
  MIN_SPOT,
  MAX_SPOT,
  BONUS_POINTS_LIMIT,
  BONUS_POINTS}
  from '../constants/Game'

  let board = []
  
  export default Gameboard = ({ route }) => {
  
      const [playerName, setPlayerName] = useState("");
      const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
      const [status, setStatus] = useState("Game has not started");
      const [totalPoints, setTotalPoints] = useState(0);
      const [bonusPoints, setBonusPoints] = useState(BONUS_POINTS_LIMIT)
      const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
      const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0));
      const [dicePointsTotal, setDicePointsTotal] = useState(new Array(MAX_SPOT).fill(false));
      const [selectedDicePoints, setSelectedDicePoints] = useState(new Array(MAX_SPOT).fill(0));
  
  
  
      const dicesRow = [];
      if (nbrOfThrowsLeft > 5) {
        dicesRow.push(
              <MaterialCommunityIcons
                  name="dice-multiple"
                  key={"multiple-dice"}
                  size={75}
                  color={"pink"}>
            </MaterialCommunityIcons>
          )
      }
      else {
          for (let dice = 0; dice < NBR_OF_DICES; dice++) {
            dicesRow.push(
                <Col key={dicesRow + dice}>
                  <Pressable
                      key={dicesRow + dice}
                      onPress={() => selectDice(dice)}
                  >
                      <MaterialCommunityIcons
                          name={board[dice]}
                          key={dicesRow + dice}
                          size={50}
                          color={getDiceColor(dice)}
                      >
                      </MaterialCommunityIcons>
                  </Pressable>
                  </Col>
              );
          }
      }
  
      const pointsRow = []
      for (let spot = 0; spot < MAX_SPOT; spot++) {
          pointsRow.push(
              <Col key={"points" + spot}>
                  <Text key={"points" + spot} style={styles.points}>{getSpotTotal(spot)}</Text>
              </Col>
          )
      }
  
  
      const buttonsRow = [];
      for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
          buttonsRow.push(
              <Col key={buttonsRow + diceButton}>
                  <Pressable key={buttonsRow + diceButton}
                      onPress={() => selectDicePoints(diceButton)}
                  >
                      <MaterialCommunityIcons
                          name={"numeric-" + (diceButton + 1) + "-circle"}
                          key={"buttonsRow" + diceButton}
                          size={40}
                          color={getDicePointsColor(diceButton)}
                          style={styles.container}>
                      </MaterialCommunityIcons>
                  </Pressable>
              </Col>
          )
      }
      useEffect(() => {
          if (playerName === "" && route.params?.player) {
              setPlayerName(route.params.player)

          }
      }, [])
  
      useEffect(() => {
          checkPoints();
          if (nbrOfThrowsLeft < NBR_OF_THROWS) {
              setStatus("Select and throw dices again");
          }
          if (nbrOfThrowsLeft < 0) {
              setNbrOfThrowsLeft(NBR_OF_THROWS - 1);
          }
      }, [nbrOfThrowsLeft]);
  
      useEffect(() => {
          if (selectedDicePoints.every(x => x)) {
              setStatus("All points selected, game over.")
        
              setNbrOfThrowsLeft(0)
          }
      })
  
      function getDiceColor(i) {
              return selectedDices[i] ? "black" : "bisque"
      }
  
      function getDicePointsColor(i) {
          return selectedDicePoints[i] ? "black" : "pink"
      }
  
      const selectDice = (i) => {
          let dices = [...selectedDices];
          dices[i] = selectedDices[i] ? false : true;
          setSelectedDices(dices);
      }
  
      function getSpotTotal(i) {
          return dicePointsTotal[i];
      }
  
      function selectDicePoints(i) {
          if (nbrOfThrowsLeft > 0) {
              setStatus("Throw 3 times before setting points")
          } else {
  
              let selected = [...selectedDices];
              let selectedPoints = [...selectedDicePoints];
              let points = [...dicePointsTotal]
              if (selectedPoints[i]) {
                  setStatus("You already selected points for " + [i + 1])
              } else {
                  if (!selectedPoints[i]) {
                      selectedPoints[i] = true;
                      let nbrOfDices = diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1 : total), 0);
                      points[i] = nbrOfDices * (i + 1);
                      setDicePointsTotal(points);
                  }
                  selected.fill(false);
                  setSelectedDices(selected);
                  setSelectedDicePoints(selectedPoints);
                  setNbrOfThrowsLeft(NBR_OF_THROWS)
                  return points[i]
              }
          }
      }
  
      const throwDices = () => {
          if (nbrOfThrowsLeft === 0) {
              setStatus("Select your points")
          }
          else {
              let spots = [...diceSpots]
              for (let i = 0; i < NBR_OF_DICES; i++) {
                  if (!selectedDices[i]) {
                      let randomNumber = Math.floor(Math.random() * 6 + 1)
                      board[i] = "dice-" + randomNumber;
                      spots[i] = randomNumber
                  }
              }
              setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
              setDiceSpots(spots);
              setStatus("Select and throw dices again")
          }
      }
  
      const checkPoints = () => {
          const sum = dicePointsTotal.reduce((total, a) => total + a, 0);
          setTotalPoints(sum)
          if (nbrOfThrowsLeft >= 0) {
              setTotalPoints(sum)
              checkBonusPoints(sum)
          }
  
      }
  
      const checkBonusPoints = (sum) => {
          const bonus = BONUS_POINTS_LIMIT - sum;
  
          if (bonus <= 0) {
              setBonusPoints(0)
              setTotalPoints(sum + BONUS_POINTS)
          }
          else if (bonus > 0) {
              setBonusPoints(bonus)
          }
      }
  
      const newGame = () => {
        setSelectedDices(new Array(NBR_OF_DICES).fill(false))
        setDicePointsTotal(new Array(MAX_SPOT).fill(false))
        setSelectedDicePoints(new Array(MAX_SPOT).fill(0))
        setNbrOfThrowsLeft(3)
        setTotalPoints(0)
        setBonusPoints(63)

        setStatus('New game started!')
      }
  
      return (
          <View>
              <ScrollView>
                <Header style={styles.header} />
                    <View style={styles.gameboard}>
                        <Container fluid>
                            <Row>{dicesRow}</Row>
                        </Container>
                    </View>
                  <Text style={styles.gameinfo}>Throws left:{nbrOfThrowsLeft}</Text>
                  <Text style={styles.gameinfo}>{status}:</Text>
                  <View style={styles.row}>                  
                    <Pressable style={styles.button}
                      onPress={() => throwDices()}>
                      <Text style={styles.buttonText}>
                          Throw dices
                      </Text>
                    </Pressable>
                    <Pressable style={styles.button}
                      onPress={() => newGame()}>
                      <Text style={styles.buttonText}>
                          New game
                      </Text>
                    </Pressable>
                  </View>
                <Text style={styles.gameinfo}>Total points: {totalPoints}</Text>
                <Text style={styles.gameinfo}> You need {bonusPoints} points for bonus</Text>
                <View style={styles.row}>
                    <Container fluid>
                        <Row>{pointsRow}</Row>
                    </Container>
                </View>
                  <View style={styles.row}>
                    <Container>
                        <Row>{buttonsRow}</Row>
                        </Container>
                        </View>
                    <Text style={styles.gameinfo}>Player: {playerName} </Text>
                  <Footer/>
              </ScrollView>
          </View>
      )
  }
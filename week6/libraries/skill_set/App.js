import { StyleSheet, Text, SafeAreaView, ScrollView, View } from 'react-native';
import Slider from '@react-native-community/slider'
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-native-flex-grid';

const SKILLS = ['Frontend', 'Backend', 'Mobile', 'Databases']
const MIN = 0
const MAX = 5

export default function App() {

  const [value, setValue] = useState(0)
  const [values, setValues] = useState(new Array(SKILLS.length).fill(0))
  const [average, setAverage] = useState(0)

  useEffect(() => {
    calculateAverageSkill()
  }, [values])

/* setSkillValue() takes two arguments that are the value and the
index of the skill. Function uses spread operator [...] for taking an exact copy
from the state variable array before calling setValues() that will update the
state variable  */

  const setSkillValue = (val, i) => {
    let skillValues = [...values]
    skillValues[i] = val
    setValues(skillValues)
  }

  const calculateAverageSkill = () => {
    const sum = values.reduce((a, b) => a + b, 0)
    const avg = (sum / values.length) || 0
    setAverage(avg)
  }



  
  const items = []
  for (let i = 0; i < SKILLS.length; i++) {
    items.push(
      <View key={'item' + i}>
        <Text>{SKILLS[i]}</Text>
        <Text>Skill: {values[i]}</Text>
        <Container fluid>
          <Row>
            <Col><Text>{MIN}</Text></Col>
            <Col xs='9'>
            <Slider
              style={{width: 200, height: 40}}
              minimumValue={0}
              maximumValue={10}
              step={1}
              value={values[i]}
              minimumTrackTintColor='#d10f0f'
              maximumTrackTintColor='#ff9900'
              onValueChange={(val) => setSkillValue(val, i)} />
            </Col>
            <Col><Text>{MAX}</Text></Col>
          </Row>
        </Container>
      </View>
    )
  }

  return (
    <SafeAreaView>
    <View style={styles.container}>
     <ScrollView>
      <Text>Skill set</Text>
      <View>{items}</View>
      <Text>Average</Text>
      <Text>{average}</Text>
     </ScrollView>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60
  },
});

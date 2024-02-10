import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Container, Row, Col } from 'react-native-flex-grid';
import DateTimePicker from '@react-native-community/datetimepicker'


const [date, setDate] = useState(new Date())
const [startDate, setStartDate] = useState('')
const [endDate, setEndDate] = useState('')
const [startTime, setStartTime] = useState('')
const [endTime, setEndTime] = useState('')
const [status, setStatus] = useState('Pick start date & time')
const [mode, setMode] = useState('date')
const [show, setShow] = useState(false)

export default function App() {

  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }
  
  const showDatePicker = () => {
    showMode('date')
  }

  const showTimePicker = () => {
    showMode('time')
  }

/*
isValidEndDay() takes one argument that is the selected date of the
end of the booking. Dates are saved to correspondent state variables as strings
using format dd.MM.yyyy. JavaScript function split() is used to split date
strings to three parts (day, month, year) according to separator. Then year,
month and day will be compared in order to check that end date is not before
the start date
*/

const isValidEndDay = (newDate) => {
  let start = startDate.split('.')
  let end = endDate.split('.')
  if (parseInt(end[2]) < parseInt(start[1])) {
    return false
  }
  else if (parseInt(end[2]) === parseInt(start[2]) &&
  parseInt(end[1]) < parseInt(start[1])) {
    return false
  }
  else if (parseInt(end[2]) === parseInt(start[2]) &&
  parseInt(end[1]) === parseInt(start[1]) &&
  parseInt(end[0]) < parseInt(start[0])) {
    return false
  }
  else {
    return true
  }
}




  return (
    <View style={styles.container}>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

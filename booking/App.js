import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Container, Row, Col } from 'react-native-flex-grid';
import DateTimePicker from '@react-native-community/datetimepicker'




export default function App() {

  const [date, setDate] = useState(new Date())
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [status, setStatus] = useState('Pick start date & time')
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)


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
  let end = newDate.split('.')
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

/*
isValidEndTime() uses the same practice for checking that daytime
of the booking is after the start daytime. First start date and end date are
compared. If those are the equal, daytimes are saved to correspondent state
variables as strings using format hh:mm. JavaScript function split() is used
to split daytime strings to two parts (hours, minutes) according to separator.
Then hours and minutes will be compared in order to check that end daytime is
not before the start daytime
*/

const isValidEndTime = (newTime) => {
  if (startDate === endDate) {
    let start = startTime.split('.')
    let end = newTime.split('.')
    if (parseInt(end[0]) < parseInt(start[0])) {
      return false
    }
    else if (parseInt(end[0]) === parseInt(start[0]) &&
    parseInt(end[1]) < parseInt(start[1])) {
      return false
    }
    else if (parseInt(end[0]) === parseInt(start[0]) &&
    parseInt(end[1]) <= parseInt(start[1])) {
      return false
    }
    else {
      return true
    }
  }
}

/*
handleDate() takes selected timestamp as an argument. It formats
the date to dd.MM.yyyy format. It checks if there is a start date. If not, start
date will be assigned as the value of the correspondent state variable. In other
case function isValidEndDay() is called, and if that function returns true, end
date will be assigned as the value of the correspondent state variable
*/

const handleDate = (current) => {
  let newDate =
  current.getDate() + '.' +
  (current.getMonth() + 1) + '.' +
  current.getFullYear()
  if (startDate === '') {
    setStartDate(newDate)
  }
  else {
    if (isValidEndDay(newDate)) {
      setEndDate(newDate)
    }
    else {
      setStatus('Error: end is set before start.')
    }
  }
}

/*
handleTime() uses the same practice for formatting the daytime. It
takes selected timestamp as an argument, and formats the daytime to hh:mm
format. It checks if there is a start daytime. If not, start daytime will be
assigned as the value of the correspondent state variable. In other case
function isValidEndTime() is called, and if that function returns true, end
daytime will be assigned as the value of the correspondent state variable.
*/

const handleTime = (current) => {
  let hours = current.getHours().toString()
  let minutes = current.getMinutes().toString()
  if (hours.length === 1) {
    hours = '0' + minutes
  }
  if (minutes.length === 1) {
    minutes = '0' + minutes
  }
  let newTime = hours + ':' + minutes 
  if (startTime === '') {
    setStartTime(newTime)
    setStatus('Pick end day & time')
  } else {
    if (isValidEndTime(newTime)) {
      setEndTime(newTime)
      setStatus('Well done!')
    } 
    else {
      setStatus('Error: end must be after start')
    }
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

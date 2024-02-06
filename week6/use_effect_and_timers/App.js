import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Button } from 'react-native';

export default function App() {

/*  
EXAMPLE 1: LOG & ACTIVITY

const [isPending, setPending] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      //console.log("This timer is run after 2 seconds!")
      setPending(false)
    }, 10000)
  }, [])

  return (
    <View style={styles.container}>
      <ActivityIndicator 
      size={'large'}
      animating={isPending}
      />
      {!isPending && <Text>Time is up!</Text>}
      <StatusBar style="auto" />
    </View>
  ); */

  const [count, setCount] = useState(0)
  const [timerId, setTimerId] = useState(0)

  useEffect(() => {
    const timerId = setInterval(() => {
      setCount( prev => prev + 1)
    }, 1000)
    setTimerId(timerId)
  }, [])

  return(
    <View>
      <Text style={{fontSize: 40}}>{count}</Text>
      <Button title='STOP' onPress={() => clearInterval(timerId)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const URL = 'https://www.boredapi.com/api/activity'
const [activity, setActivity] = useState('')
const [type, setType] = useState('')
const [participants, setParticipants] = useState(0)
const [price, setPrice] = useState(0)
const [isLoading, setIsLoading] = useState(true)
const [error, setError] = useState(null)
const [refresh, setRefresh] = useState()

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
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

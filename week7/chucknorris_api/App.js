import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator, Image } from 'react-native';

const URL = 'https://api.chucknorris.io/jokes/random'
const imgURL = 'https://api.chucknorris.io/img/chucknorris_logo_coloured_small@2x.png'


export default function App() {

  const [joke, setJoke] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refresh, setRefresh] = useState()


  const getNewJoke = () => {
    setRefresh({})
  }

  useEffect(() => {
    fetch(URL)
    .then(response => response.json())
    .then ((json) => {
      console.log(json);
      setJoke(firstLetterToLowerCase(json.value))
      setError(null)
      setIsLoading(false)
    }, (error) => {
      setError('Error retrieving joke!')
      setIsLoading(false)
      console.log(error);
    })
  }, [refresh])

  const firstLetterToLowerCase = (str) => {
    return str.charAt(0).toLowerCase() + str.slice(1)
  }

  if (isLoading) {
    return <View style={styles.container}>
      <ActivityIndicator size='large' />
    </View>
  } else if (error) {
    return <View style={styles.container}>
      <Text>{error}</Text>
    </View>
  } else {
    return (
      <View style={styles.container}>
        <Image source={{uri: imgURL}}/>
        <Text style={styles.activity}>
          {joke}
        </Text>
        <Button title='Refresh' onPress={() => getNewJoke()} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

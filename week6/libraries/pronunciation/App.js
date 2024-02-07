import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import * as Speech from 'expo-speech';
import { useState } from 'react';

export default function App() {

  const [words, setWords] = useState('')

  const Speak = () => {
  
    Speech.speak(words)
    //setWords('')
  }
  return (
    <View style={styles.container}>
      <TextInput value={words} placeholder='Type here' onChangeText={text => setWords(text)}/>
      <StatusBar style="auto" />
      <Button title='Press to hear sounds' onPress={Speak}/>
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

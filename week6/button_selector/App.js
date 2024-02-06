import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';


export default function App() {

  
const values = ['Option 1', 'Option 2']
const [value, setValue] = useState(values[0])

const ButtonSelector = ({values, selectedValue, selectionChanged}) => {

  return(
    <view>
      {values.map(value => {
        <Pressable
        key={value}
        onPress={() => selectionChanged(value)}>
          <text style={[value==selectedValue]}>{value}</text>
        </Pressable>
      })}
    </view>
  )


  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <ButtonSelector
      values={values}
      selectedValue={value}
      selectionChanged={setValue} />
      <StatusBar style="auto" />
    </View>
  )
 ;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

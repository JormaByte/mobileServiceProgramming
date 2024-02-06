import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

export default function App() {

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

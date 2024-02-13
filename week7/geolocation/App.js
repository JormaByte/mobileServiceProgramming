import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import * as Location from 'expo-location';

export default function App() {
  //const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setIsLoading(false)
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Lowest });
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude)
      setIsLoading(false)
    })();
  }, []);

 /*  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if () {
    text = JSON.stringify(location);
    
  } */

  if (isLoading) {
    return (
    <View style={styles.container}>
      <Text>Retrieving location.</Text>
    </View>
    )
  } else {
    return (
    <View style={styles.container}>
      <Text>Location:</Text>
      <Text>{latitude.toFixed(3)}</Text>
      <Text>{longitude.toFixed(3)}</Text>
    </View>
    
  )}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});

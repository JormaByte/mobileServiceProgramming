import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions} from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location';
import Constants from 'expo-constants' 


const INITIAL_LATITUDE_DELTA = 0.0922
const INITIAL_LONGITUDE_DELTA = 0.0421

export default function App() {

  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      try {
        if (status !== 'granted') {
          setIsLoading(false)
          setErrorMsg('Permission to access location was denied');
          return;
        }

        let location = await Location.getLastKnownPositionAsync({
          accuracy: Location.Accuracy.High });
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude)
        setIsLoading(false)
      } catch (error) {
        alert(error)
        setIsLoading(false)
    }
  }) ();
  }, []);


  if (isLoading) {
    return (
    <View style={styles.container}>
      <Text>Retrieving location.</Text>
    </View>
    )
  } else {
    return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: INITIAL_LATITUDE_DELTA,
          longitudeDelta: INITIAL_LONGITUDE_DELTA
        }}
      >
        <Marker title='testing' coordinate={{
          latitude: latitude,
          longitude: longitude
        }}/>
      </MapView>
    </View>
    
  )}

}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - Constants.statusBarHeight
  }
});

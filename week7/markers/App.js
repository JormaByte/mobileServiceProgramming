import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, Button} from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location';
import Constants from 'expo-constants' 


const INITIAL_LATITUDE_DELTA = 0.0922
const INITIAL_LONGITUDE_DELTA = 0.0421

export default function App() {


  const [isLoading, setIsLoading] = useState(true)
  const [markers, setMarkers] = useState([])

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      try {
        if (status !== 'granted') {
          setIsLoading(false)
          setErrorMsg('Permission to access location was denied');
          return;
        }

        const location = await Location.getLastKnownPositionAsync({
          accuracy: Location.Accuracy.High });
        const newLocation = [...markers, location.coords]
        setMarkers(newLocation)
        setIsLoading(false)
      } catch (error) {
        alert(error)
        setIsLoading(false)
    }
  }) ();
  }, []);

  /*
function for adding markers. Location coordinates of the new marker will be
passed as a parameter. Then the same spread syntax will be used when adding
location coordinates to the state array of markers.
  */
  const addMarker = (coords) => {
    const newLocation = [...markers, coords]
    setMarkers(newLocation)
  }


  const clearExtraMarkers = () => {
    const myLocation = [...markers.slice(0, 1)]
    setMarkers(myLocation)
  }



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
        showsUserLocation={true}
        style={styles.map}
        initialRegion={{
          // Checking if markers array is empty. If it isn't -> only then access location.
          latitude: markers.length > 0 ? markers[0].latitude : 0,
          longitude: markers.length > 0 ? markers[0].longitude : 0,
          latitudeDelta: INITIAL_LATITUDE_DELTA,
          longitudeDelta: INITIAL_LONGITUDE_DELTA
        }}
        /*addMarker() function is called location coordinates
        are passed to the function by using event.nativeEvent.coordinate */
        onPress={(event) => addMarker(event.nativeEvent.coordinate)}
      >
        {markers.map((location, index) =>(
        <Marker 
        key={index}
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude
      
        }}
        title={(index +1) + '. location'}
    
        />
        ))}
      </MapView>
      {markers.length > 1 && 
      <Button title='Clear markers' onPress={clearExtraMarkers}/>
      }
      
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
    height: Dimensions.get('window').height - Constants.statusBarHeight - 50,
    marginTop: 10,
    marginBottom: 10
  }
});

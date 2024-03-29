import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, Button} from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location';
import Constants from 'expo-constants' 
import { getDistance } from 'geolib';


const INITIAL_LATITUDE_DELTA = 0.0922
const INITIAL_LONGITUDE_DELTA = 0.0421
const EVENT_TYPE_ADD = 'added'
const EVENT_TYPE_DRAG = 'dragged'

export default function App() {

  const [isLoading, setIsLoading] = useState(true)
  const [markers, setMarkers] = useState([])
  const [distance, setDistance] = useState(0)
  const [status, setStatus] = useState('Start by adding marker.')

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
 function for handling marker. Event type is passed as a parameter. It can be
adding new marker or dragging existing marker. Function slice() is used again but
instead of adding new location coordinates, slice() is used for updating the location
coordinates in the second index of the markers state array
  */
  const handleMarker = (coords, eventType) => {
    setDistance(0)
    const newLocation = [...markers.slice(0, 1), coords ]
    setMarkers(newLocation)
    setStatus('Marker ' + eventType + '. Calculate distance.')
  }

  const calculateDistance = () => {
    setDistance(getDistance(
      { latitude: markers[0].latitude, longitude: markers[0].longitude },
      { latitude: markers[1].latitude, longitude: markers[1].longitude }
    ))
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

        onPress={(event) => handleMarker(event.nativeEvent.coordinate, EVENT_TYPE_ADD)}
      >
        {markers.map((location, index) => (
          index == 0 ?
            <Marker 
              key={index}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude }} />
          :
            <Marker draggable
              key={index}
              onDragEnd={(event) => 
              handleMarker(event.nativeEvent.coordinate, EVENT_TYPE_DRAG)}
              title={'Another location'}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude }} />
        ))}

        {distance !== 0
        ? <Text style={styles.bottom}>Distance: {distance} meters</Text>
          : <Text style={styles.bottom}>{status}</Text>
          }
            </MapView>
          
          {markers.length > 1 && 
          <Button
          style={styles.button}
          onPress={calculateDistance}
          title='Calculate' />}
  
      
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
    height: Dimensions.get('window').height - Constants.statusBarHeight -80,
    marginTop: 10,
    marginTop: 10
  },
  bottom: {
    marginTop: 5,
    marginBottom: 10
  },
  button: {
    marginBottom: 10
  }
});

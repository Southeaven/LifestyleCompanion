import React, { useState, useEffect }  from 'react';
import { View, Text } from 'react-native';
import * as Location from 'expo-location';

function LocationComponent() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }
      let location = await Location.getCurrentPositionAsync();
      setLocation(location);
    })();
  });

  let text = 'Waiting...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    let { coords, timestamp } = location;
    let { longitude, latitude } = coords;
    text = `Longitude: ${longitude} | Latitude: ${latitude} | Timestamp: ${timestamp}`;
  }

  return (
    <View>
      <Text>{text}</Text>
    </View>
  );
}

export default LocationComponent;

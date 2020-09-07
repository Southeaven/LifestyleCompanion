import React, { useState }  from 'react';
import {
  Button,
  View,
} from 'react-native';
import {
  List,
  Text,
} from 'react-native-paper';
import * as Location from 'expo-location';

const REJECTION_MESSAGE = 'Permission to access location was denied';

function LocationComponent() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [locations, setLocations] = useState([]);

  const listItems = locations.map((singleLocation, index) =>  {
    const { latitude, longitude, timestamp } = singleLocation;
    return (
      <List.Item
        key={timestamp}
        title={'LOCATION #' + (index + 1)}
        description={() => (
          <View>
            <Text>Latitude: {latitude}</Text>
            <Text>Longitude: {longitude}</Text>
            <Text>Timestamp: {timestamp}</Text>
          </View>
        )}
      />
    );
  });

  const requestLocation = async () => {
    Location.requestPermissionsAsync().then(async (responseData) => {
      let { status } = responseData;

      if (status === 'granted') {
        let location = await Location.getCurrentPositionAsync();

        let { coords, timestamp } = location;
        let { longitude, latitude } = coords;
        setLocations([...locations, {
          latitude,
          longitude,
          timestamp,
        }]);

        setErrorMsg(false);
      } else {
        setErrorMsg(REJECTION_MESSAGE);
      }
    }).catch(() => {
      setErrorMsg(REJECTION_MESSAGE);
    });
  }

  return (
    <View>
      <Button
        title="Request location"
        onPress={requestLocation}
      />
      {errorMsg ? (
        <Text>{errorMsg}</Text>
      ):(
        listItems
      )}
    </View>
  );
}

export default LocationComponent;

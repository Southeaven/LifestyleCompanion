import React, {
  useEffect,
  useState,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as Location from 'expo-location';
import SimpleMap from './SimpleMap';
import { Button,
  Dialog,
  Paragraph,
  Portal,
  TextInput,
} from 'react-native-paper';
import { connect } from 'react-redux';
import {
  addLocation,
  removeLocation,
} from '../store/locations';
import { pow } from 'react-native-reanimated';
import startLocalizationTasks from '../Localization'

const CONTROL_STATE = { NONE: 0, ADD: 1, REMOVE: 2, ADDING_FORM: 3 };

const styles = StyleSheet.create({
  button: {
    width: '100%',
  },
  container: {
    width: '100%',
    flexDirection: 'column'
  },
  containerButtons: {
    width: '100%',
    flexDirection: 'row',
    height: 50
  },
  containerButton: {
    width: '46%',
    margin: '2%'
  }
});

function getNearestLocation(locations, location) {
  let locationToRemove = null;
  for (let i = 0; i < locations.length; i++) {
    if (locationToRemove == null) {
      locationToRemove = locations[i]
    } else {
      if (Math.sqrt(Math.pow((locations[i].latitude - location.latitude), 2) + Math.pow((locations[i].longitude - location.longitude), 2)) <
        (Math.sqrt(Math.pow((locations[i].latitude - locationToRemove.latitude), 2) + Math.pow((locations[i].longitude - locationToRemove.longitude), 2)))) {
        locationToRemove = locations[i]
      }
    }
  }
  return locationToRemove;
}


function drawButtons(state, setControlState) {
  if (state == CONTROL_STATE.NONE) {
    return (
      <View style={styles.containerButtons}>
        <View style={styles.containerButton}>
          <Button
            mode="contained"
            onPress={() => setControlState(CONTROL_STATE.ADD)}
            style={styles.button}
          >
            Add location
          </Button>
        </View>
        <View style={styles.containerButton}>
          <Button
            mode="contained"
            onPress={() => setControlState(CONTROL_STATE.REMOVE)}
            style={styles.button}
          >
            Remove Location
          </Button>
        </View>
      </View>
    )

  } else if (state == CONTROL_STATE.ADD || state == CONTROL_STATE.ADDING_FORM) {
    return (
      <View style={styles.containerButtons}>
        <Text style={{ margin: 15 }}>Przytrzymaj palec na lokalizacji aby ją dodać!</Text>
      </View>
    )

  } else if (state == CONTROL_STATE.REMOVE || state == CONTROL_STATE.REMOVING_FORM) {
    return (
      <View style={styles.containerButtons}>
        <Text style={{ margin: 15 }}>Przytrzymaj palec na lokalizacji aby ją usunąć.</Text>
      </View>
    )
  }
}

function confirmAdding(activityName, range, cords, addLocationX) {
  addLocationX({
    activity: activityName,
    longitude: cords.longitude,
    latitude: cords.latitude,
    range
  })
}

function confirmRemoving(location, removeLocationX) {
  removeLocationX(location)
}


function LocationComponent({ locations, addLocationX, removeLocationX }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [controlState, setControlState] = useState(CONTROL_STATE.NONE);
  const [activityName, setActivityName] = useState(null);
  const [locationToRemove, setLocationToRemove] = useState({ activity: "NONE" });
  const [range, setRange] = useState(20);
  const [cords, setCords] = useState(null);
  const [state, setState] = useState(false);

  if(!state){
    startLocalizationTasks()
    setState(true)
  }

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
    <View style={styles.container}>
      {drawButtons(controlState, setControlState)}
      <Portal>
        <Dialog visible={controlState == CONTROL_STATE.ADDING_FORM} onDismiss={() => setControlState(CONTROL_STATE.NONE)}>
          <Dialog.Title>Adding location</Dialog.Title>
          <Dialog.Content>
            <Paragraph></Paragraph>
            <TextInput
              keyboardType='numeric'
              label="Range [meters]"
              mode="outlined"
              onChangeText={(text) => setRange(text)}
            />
            <TextInput
              label="Activity name"
              mode="outlined"
              onChangeText={(text) => setActivityName(text)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => { setControlState(CONTROL_STATE.NONE); confirmAdding(activityName, range, cords, addLocationX) }}>Done</Button>
          </Dialog.Actions>
        </Dialog>
        <Dialog visible={controlState == CONTROL_STATE.REMOVING_FORM} onDismiss={() => setControlState(CONTROL_STATE.NONE)}>
          <Dialog.Title>Removing location</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Are you sure to remove location {locationToRemove.activity}?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setControlState(CONTROL_STATE.NONE)}>No</Button>
            <Button onPress={() => { setControlState(CONTROL_STATE.NONE); confirmRemoving(locationToRemove, removeLocationX) }}>Yes</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <SimpleMap markers={locations} onLongPress={(cords) => {
        setCords(cords);
        if (controlState == CONTROL_STATE.REMOVE) {
          setControlState(CONTROL_STATE.REMOVING_FORM)
          setLocationToRemove(getNearestLocation(locations, cords))
        } else if (controlState == CONTROL_STATE.ADD)
          setControlState(CONTROL_STATE.ADDING_FORM)
      }}>
      </SimpleMap>
      <Text>{text}</Text>
    </View>
  );
}

const mapStateToProps = state => {
  const { locations } = state;

  return { locations };
};

const mapDispatchToProps = dispatch => {
  return {
    addLocationX: location => {
      dispatch(addLocation(location))
    },
    removeLocationX: location => {
      dispatch(removeLocation(location))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationComponent);

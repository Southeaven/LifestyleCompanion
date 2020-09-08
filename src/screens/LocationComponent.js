import React, { useState, useEffect }  from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Location from 'expo-location';
import SimpleMap from './SimpleMap';
import {Button, Paragraph, Dialog, Portal, HelperText, Subheading, TextInput} from 'react-native-paper';

const CONTROL_STATE = {NONE: 0, ADD: 1, REMOVE: 2, ADDING_FORM: 3};

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


function drawButtons(state, setControlState) {
  if (state == CONTROL_STATE.NONE) {
    return(   
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

  }else if (state == CONTROL_STATE.ADD || state == CONTROL_STATE.ADDING_FORM){
    return(    
      <View style={styles.containerButtons}>
        <Text style={{margin:15}}>Przytrzymaj palec na lokalizacji aby ją dodać!</Text>
      </View>
    )

  }else if (state == CONTROL_STATE.REMOVE){
    return(    
      <View style={styles.containerButtons}>
        <Text style={{margin:15}}>Przytrzymaj palec na lokalizacji aby ją usunąć.</Text>
      </View>
    )
  }
}

function confirmAdding(activityName, range, cords){
}


function LocationComponent() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [controlState, setControlState] = useState(CONTROL_STATE.NONE);
  const [activityName, setActivityName] = useState(null);
  const [range, setRange] = useState(20);
  const [cords, setCords] = useState(null);
  

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
                keyboardType = 'numeric'
                label="Range [meters]"
                mode="outlined"
                onChangeText={(text) => setActivityName(text)}
              />
              <TextInput
                label="Activity name"
                mode="outlined"
                onChangeText={(text) => setRange(text)}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => {setControlState(CONTROL_STATE.NONE); confirmAdding(activityName, range, cords)}}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <SimpleMap onLongPress={ (cords) => {setCords(cords); if(controlState==CONTROL_STATE.REMOVE) setControlState(CONTROL_STATE.NONE); else if(controlState==CONTROL_STATE.ADD) setControlState(CONTROL_STATE.ADDING_FORM)} }></SimpleMap>
        <Text>{text}</Text>
      </View>
  );
}

export default LocationComponent;

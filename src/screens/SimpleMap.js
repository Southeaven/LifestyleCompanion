import React, {useState} from 'react';
import MapView from 'react-native-maps';
import {
  Dimensions,
  StyleSheet,
} from 'react-native';

export default function SimpleMap(props) {
  for(let i=0; i<props.markers.length; i++){
    props.markers[i].key=i
  }
  return (
    <MapView style={styles.mapStyle}
      initialRegion={{
        latitude: 52.4144,
        longitude: 16.9211,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      showsUserLocation={true}
      onLongPress={(e) => { props.onLongPress(e.nativeEvent.coordinate) }}
    >

      {props.markers.map((marker) => {
        return(<MapView.Marker coordinate={{longitude: marker.longitude, latitude: marker.latitude}} title={marker.activity} key={marker.key}/>)
      })}
      {props.markers.map((marker) => {
        let strCol = 'rgba(255, 50, 50, 0.5)'
        let fillCol = 'rgba(225, 150, 150, 0.3)'
        if(marker.active){
          strCol = 'rgba(50, 255, 50, 0.5)'
          fillCol = 'rgba(150, 225, 150, 0.3)'
        }
        return(<MapView.Circle key={marker.key} center={{longitude: marker.longitude, latitude: marker.latitude}} radius={parseInt(marker.range)} strokeColor = {strCol} fillColor = {fillCol} strokeWidth = {4}/>)
      })}
    </MapView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.85,
  },
});

import React from 'react';
import MapView from 'react-native-maps';
import {
  Dimensions,
  StyleSheet,
} from 'react-native';

export default function SimpleMap(props) {
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
      {props.markers.map((marker) => (
        <MapView.Marker coordinate={{longitude: marker.longitude, latitude: marker.latitude}} title={marker.activity}/>
      ))}
      {props.markers.map((marker) => (
        <MapView.Circle center={{longitude: marker.longitude, latitude: marker.latitude}} radius={parseInt(marker.range)} strokeColor = 'rgba(50, 50, 255, 0.5)' fillColor = 'rgba(150, 150, 255, 0.3)' strokeWidth = {4}/>
      ))}
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

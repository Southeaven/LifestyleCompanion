import React from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { VictoryPie } from "victory-native";

const styles = StyleSheet.create({
  container: {
    margin: 10
  },
});


function ChartScreen({ activities, ...props }) {
  const deviceWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <VictoryPie
        data={activities}
        padding={100}
        width={deviceWidth}
      />
    </View>
  );
}

const mapStateToProps = state => {
  const { activities } = state;

  const reducedActivities = activities.reduce(function(obj, v) {
    obj[v.activityName] = (obj[v.activityName] || 0) + 1;

    return obj;
  }, {})

  let reducedActivitiesArray = [];
  for (let [key, value] of Object.entries(reducedActivities)) {
    reducedActivitiesArray.push({
      x: key,
      y: value,
    })
  }

  return { activities: reducedActivitiesArray };
};

export default connect(mapStateToProps)(ChartScreen);

import React from 'react';
import {
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import {
  DataTable,
  Subheading,
  Text,
} from 'react-native-paper';
import { format } from 'date-fns';
import { VictoryPie } from "victory-native";

const styles = StyleSheet.create({
  container: {
    margin: 10
  },
});

const CUTOFF_POINT = 0.05;

function StatisticsScreen({ activities, rawActivities, ...props }) {
  const deviceWidth = Dimensions.get('window').width;

  const listItems = rawActivities.map((rawActivity) => {
    // const startDate = format(new Date(rawActivity.startDate), 'yyyy/MM/dd');
    // const startTime = format(new Date(rawActivity.startDate), 'HH:mm');
    // const stopDate = format(new Date(rawActivity.stopDate), 'yyyy/MM/dd');
    // const stopTime = format(new Date(rawActivity.stopDate), 'HH:mm');

    return (
      <DataTable.Row
        key={rawActivity.id}
      >
          <DataTable.Cell>{rawActivity.activityName}</DataTable.Cell>
          <DataTable.Cell>
            <Text>{rawActivity.units * 15} min</Text>
          </DataTable.Cell>
          <View>
            <Button
              title="View more"
              // onPress={}
            />
          </View>
      </DataTable.Row>
    );
  });

  return (
    <ScrollView style={styles.container}>
      <Subheading>Activity data</Subheading>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Length</DataTable.Title>
          <DataTable.Title>Action</DataTable.Title>
        </DataTable.Header>
        {listItems}
      </DataTable>
      <Subheading>Activity chart</Subheading>
      <VictoryPie
        colorScale="qualitative"
        data={activities}
        padding={100}
        width={deviceWidth}
      />
    </ScrollView>
  );
}

const mapStateToProps = state => {
  const { activities } = state;

  const reducedActivities = activities.reduce(function (obj, v) {
    obj[v.activityName] = (obj[v.activityName] || 0) + v.units;

    return obj;
  }, {})

  let reducedActivitiesArray = [];
  for (let [key, value] of Object.entries(reducedActivities)) {
    reducedActivitiesArray.push({
      x: key,
      y: value,
    })
  }
  const totalSum = reducedActivitiesArray.reduce((a, b) => a + b.y, 0);
  reducedActivitiesArray.sort((a, b) => a.y > b.y);

  let otherElements = 0;
  if (reducedActivitiesArray[0].y / totalSum < CUTOFF_POINT) {
    otherElements = reducedActivitiesArray.shift().y;

    while (otherElements / totalSum < CUTOFF_POINT) {
      otherElements += reducedActivitiesArray.shift().y
    }
  }

  reducedActivitiesArray.sort((a, b) => a.y < b.y);

  if (otherElements > 0) {
    reducedActivitiesArray.push({
      x: 'Other activities',
      y: otherElements
    })
  }

  return {
    activities: reducedActivitiesArray,
    rawActivities: activities,
  };
};

export default connect(mapStateToProps)(StatisticsScreen);

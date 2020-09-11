import React, { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import {
  Button,
  DataTable,
  Dialog,
  List,
  Portal,
  Subheading,
  Text,
} from 'react-native-paper';
import { format } from 'date-fns';
import { VictoryPie } from "victory-native";
import { removeActivity } from '../store/activities';

const styles = StyleSheet.create({
  container: {
    margin: 10
  },
  centeredContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 10,
  },
  marginTop: {
    marginTop: 5
  },
});

const CUTOFF_POINT = 0.05;

function ActivityModal({ visible, onDismiss, activity, onRemoveActivity }) {
  const startDate = format(new Date(activity.startDate), 'yyyy/MM/dd');
  const startTime = format(new Date(activity.startDate), 'HH:mm');
  const stopDate = format(new Date(activity.stopDate), 'yyyy/MM/dd');
  const stopTime = format(new Date(activity.stopDate), 'HH:mm');

  const handleRemoveActivity = () => {
    onRemoveActivity({
      id: activity.id,
    });
    onDismiss();
  };

  return (
    <Dialog visible={visible} onDismiss={onDismiss}>
      <Dialog.Title>Activity details</Dialog.Title>
      <Dialog.Content>
        <List.Item title="Start date" description={startDate} />
        <List.Item title="Start time" description={startTime} />
        <List.Item title="Stop date" description={stopDate} />
        <List.Item title="Stop time" description={stopTime} />
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={() => handleRemoveActivity()}>Delete</Button>
        <Button onPress={onDismiss}>Close</Button>
      </Dialog.Actions>
    </Dialog>
  );
}

function StatisticsScreen({ activities, rawActivities, removeOneActivity, ...props }) {
  const deviceWidth = Dimensions.get('window').width;

  const [showModal, setShowModal] = useState(false);
  const [activityData, setActivityData] = useState(null);

  const listItems = rawActivities.map((rawActivity) => {
    const handleShowModal = (singleActivity) => {
      setActivityData(singleActivity);
      setShowModal(true);
    };

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
            mode="contained"
            onPress={() => handleShowModal(rawActivity)}
            style={styles.marginTop}
          >
            View more
          </Button>
        </View>
      </DataTable.Row>
    );
  });

  return (
    <>
      {
        !rawActivities.length ? (
          <View style={styles.centeredContainer}>
            <Subheading>No activities available</Subheading>
          </View>
        ) : (
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
              <Portal>
                {activityData !== null && (
                  <ActivityModal
                    visible={showModal}
                    onDismiss={() => setShowModal(false)}
                    activity={activityData}
                    onRemoveActivity={removeOneActivity}
                  />
                )}
              </Portal>
            </ScrollView>
          )
      }
    </>
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
  if (reducedActivitiesArray.length && reducedActivitiesArray[0].y / totalSum < CUTOFF_POINT) {
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

const mapDispatchToProps = dispatch => {
  return {
    removeOneActivity: activity => {
      dispatch(removeActivity(activity))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatisticsScreen);

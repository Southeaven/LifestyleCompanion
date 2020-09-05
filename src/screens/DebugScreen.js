import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import {
  List,
  Text,
} from 'react-native-paper';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  container: {
    margin: 10
  },
  listStyles: {
    width: 100,
    height: 100
  }
});

function DebugScreen({ activities, ...props}) {
  const listItems = activities.map((activity) =>  {
    const activityDate = format(activity.date, 'yyyy/MM/dd, HH:mm');
    const timeslotDate = format(activity.timeslot, 'yyyy/MM/dd, HH:mm');

    return (
      <List.Item
        key={activity.id}
        title={activity.activityName}
        description={() => (
          <View>
            <Text>{activityDate}</Text>
            <Text>{timeslotDate}</Text>
          </View>
        )}
      />
    );
  });

  return (
    <View style={styles.container}>
      {listItems}
    </View>
  );
};

const mapStateToProps = state => {
  const { activities } = state;

  return { activities };
};

export default connect(mapStateToProps)(DebugScreen);

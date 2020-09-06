import React from 'react';
import {
  ScrollView,
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
});

function DebugScreen({ activities, ...props}) {
  const listItems = activities.map((activity) =>  {
    const firstDate = format(activity.firstDate, 'yyyy/MM/dd, HH:mm');
    const secondDate = format(activity.secondDate, 'yyyy/MM/dd, HH:mm');
    const startDate = format(activity.startDate, 'yyyy/MM/dd, HH:mm');
    const stopDate = format(activity.stopDate, 'yyyy/MM/dd, HH:mm');

    return (
      <List.Item
        key={activity.id}
        title={activity.activityName}
        description={() => (
          <View>
            <Text>First date: {firstDate}</Text>
            <Text>Second date: {secondDate}</Text>
            <Text>Start date: {startDate}</Text>
            <Text>Stop date: {stopDate}</Text>
          </View>
        )}
      />
    );
  });

  return (
    <ScrollView style={styles.container}>
      {listItems}
    </ScrollView>
  );
};

const mapStateToProps = state => {
  const { activities } = state;

  return { activities };
};

export default connect(mapStateToProps)(DebugScreen);

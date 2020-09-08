import React from 'react';
import {
  Button,
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
import { resetStore } from '../store/debug';

const styles = StyleSheet.create({
  container: {
    margin: 10
  },
});

function DebugScreen({ activities, resetData, ...props}) {
  const listItems = activities.map((activity) =>  {
    const firstDate = format(new Date(activity.firstDate), 'yyyy/MM/dd, HH:mm');
    const secondDate = format(new Date(activity.secondDate), 'yyyy/MM/dd, HH:mm');
    const startDate = format(new Date(activity.startDate), 'yyyy/MM/dd, HH:mm');
    const stopDate = format(new Date(activity.stopDate), 'yyyy/MM/dd, HH:mm');

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
            <Text>Units: {activity.units}</Text>
          </View>
        )}
      />
    );
  });

  const handleResetData = () => resetData();

  return (
    <View style={styles.container}>
      <Button
        title="RESET STORE"
        onPress={handleResetData}
      />
      <ScrollView style={styles.container}>
        {listItems}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => {
  const { activities } = state;

  return { activities };
};

const mapDispatchToProps = dispatch => {
  return {
    resetData: () => {
      dispatch(resetStore());
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DebugScreen);

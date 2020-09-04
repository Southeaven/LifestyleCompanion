import React, { useState } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import {
  Button,
  TextInput,
  Title,
  HelperText,
  Text,
  Snackbar,
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  format,
  setSeconds,
} from 'date-fns';
import { setActivityNotification } from '../store/notifications';
import { addActivity } from '../store/activities';

const styles = StyleSheet.create({
  button: {
    marginTop: 10
  },
  buttonInRow: {
    flex: 1
  },
  buttonRow: {
    flexDirection: 'row'
  },
  container: {
    margin: 10
  },
  leftButton: {
    marginRight: 5
  },
  rightButton: {
    marginLeft: 5
  }
});

function ActivityFormTemplate({
  addOneActivity,
  addActivityNotificationState,
  toggleActivityNotification,
  navigation,
}) {
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [isError, setIsError] = useState(false);

  const [activityName, setActivityName] = useState('');
  const [date, setDate] = useState(new Date());

  const handleActivityNameChange = (newActivityName) => {
    setIsError(newActivityName === '');
    setActivityName(newActivityName);
  };

  const onChange = (event, selectedDate) => {
    setShow(false);

    if (selectedDate) {
      const currentDate = setSeconds(selectedDate, 0) || date;
      setDate(currentDate);
    }
  };

  const showDatepicker = (event, isDate) => {
    setMode(isDate ? 'date' : 'time');
    setShow(true);
  };

  const handleAddActivity = (event) => {
    if (!isError) {
      addOneActivity({
        activityName,
        date
      });
      toggleActivityNotification(true);
      // navigation.navigate('WelcomeScreen');
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <Title>Activity Form</Title>
        <TextInput
          label="Activity name"
          mode="outlined"
          onChangeText={text => handleActivityNameChange(text)}
          value={activityName}
          error={isError}
        />
        <HelperText type="error" visible={isError}>
          Activity name is required
        </HelperText>
        <TextInput
          editable={false}
          label="Activity date"
          mode="outlined"
          value={format(date, 'yyyy/MM/dd, HH:mm')}
        />
        <View style={styles.buttonRow}>
          <Button
            mode="contained"
            onPress={e => showDatepicker(e, true)}
            style={[styles.button, styles.buttonInRow, styles.leftButton]}
          >
            Set date
          </Button>
          <Button
            mode="contained"
            onPress={e => showDatepicker(e, false)}
            style={[styles.button, styles.buttonInRow, styles.rightButton]}
          >
            Set time
          </Button>
        </View>
        <Button
          mode="contained"
          style={styles.button}
          onPress={e => handleAddActivity(e)}
        >
          Submit
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          onPress={e => navigation.navigate('WelcomeScreen')}
        >
          Back to main menu
        </Button>
      </View>
      <View>
        <Snackbar
          visible={addActivityNotificationState}
          onDismiss={() => toggleActivityNotification(false)}
        >
          Added an activity
        </Snackbar>
      </View>
      <View>
        {show && (
          <DateTimePicker
            display="default"
            mode={mode}
            onChange={onChange}
            value={date}
          />
        )}
      </View>
    </View>
  );
}

const mapStateToProps = state => {
  const { notifications: { addActivity } } = state;

  return { addActivityNotificationState: addActivity };
};

const mapDispatchToProps = dispatch => {
  return {
    addOneActivity: activity => {
      dispatch(addActivity(activity))
    },
    toggleActivityNotification: activityState => {
      dispatch(setActivityNotification(activityState))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityFormTemplate);

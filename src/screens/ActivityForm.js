import React, { useState } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { connect } from 'react-redux';
import {
  Button,
  TextInput,
  Title
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  format,
  setSeconds
} from 'date-fns';
import * as addActivity from '../store/actions';

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

function ActivityFormTemplate({ addActivity }) {
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');

  const [activityName, setActivityName] = useState('');
  const [date, setDate] = useState(new Date());

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

  return (
    <View>
      <View style={styles.container}>
        <Title>Activity Form</Title>
        <TextInput
          label="Activity name"
          mode="outlined"
          onChangeText={text => setActivityName(text)}
          value={activityName}
        />
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
          // onPress={addActivity}
        >
          Submit (not working yet)
        </Button>
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

const mapDispatchToProps = dispatch => {
  return {
    addTodo: activity => {
      dispatch(addActivity(activity))
    }
  }
}

export default connect(null, mapDispatchToProps)(ActivityFormTemplate);

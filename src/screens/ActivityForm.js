import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { TextInput, Button, Title } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as addActivity from '../store/actions';

const styles = StyleSheet.create({
  container: {
    margin: 10
  },
  button: {
    marginTop: 10
  },
  inputsRow: {
    flexDirection: 'row'
  },
  input: {
    flex: 1
  },
  firstInput: {
    marginRight: 5
  },
  secondInput: {
    marginLeft: 5
  }
});

const parseDate = (date) => {
  return date;
};

function ActivityFormTemplate({ addActivity }) {
  const [activityName, setActivityName] = useState('');

  const [date, setDate] = useState('');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View>
      <View style={styles.container}>
        <Title>Activity Form</Title>
        <TextInput
          label="Activity name"
          value={activityName}
          mode="outlined"
          onChangeText={text => setActivityName(text)}
        />
        <View style={styles.inputsRow}>
          <TextInput
            label="Activity start date"
            value={date.toString()}
            readonly
            mode="outlined"
            onFocus={showDatepicker}
            style={[styles.input, styles.firstInput]}
          />
          <TextInput
            label="Activity start time"
            value={date.toString()}
            readonly
            mode="outlined"
            onFocus={showDatepicker}
            style={[styles.input, styles.secondInput]}
          />
        </View>
        <View style={styles.inputsRow}>
          <TextInput
            label="Activity end date"
            value={date.toString()}
            readonly
            mode="outlined"
            onFocus={showDatepicker}
            style={[styles.input, styles.firstInput]}
          />
          <TextInput
            label="Activity end time"
            value={date.toString()}
            readonly
            mode="outlined"
            onFocus={showDatepicker}
            style={[styles.input, styles.secondInput]}
          />
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
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={date !== '' ? date : new Date() }
            is24Hour={true}
            display="default"
            onChange={onChange}
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

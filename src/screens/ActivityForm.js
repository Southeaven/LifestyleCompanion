import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { TextInput, Button, Title } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import addActivity from '../store/actions';

const styles = StyleSheet.create({
  container: {
    margin: 10
  },
  button: {
    marginTop: 10
  }
});

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
        <TextInput
          label="Activity date"
          value={date.toString()}
          readonly
          mode="outlined"
          onFocus={showDatepicker}
        />
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

export default ActivityForm = connect(null, mapDispatchToProps)(ActivityFormTemplate);

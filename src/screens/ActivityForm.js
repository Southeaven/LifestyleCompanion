import React, {useState} from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

function ActivityForm() {
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
      <View>
        <TextInput
          label="Activity name"
          value={activityName}
          onChangeText={text => setActivityName(text)}
        />
        <TextInput
          label="Activity date"
          value={date.toString()}
          readonly
          onFocus={showDatepicker}
        />
        <Button
          mode="contained"
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

export default ActivityForm;

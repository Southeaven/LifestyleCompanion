import React, { useState } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import {
  Button,
  HelperText,
  RadioButton,
  Snackbar,
  Subheading,
  Text,
  TextInput,
  Title,
  TouchableRipple,
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  format,
  setSeconds,
} from 'date-fns';
import { setActivityNotification } from '../store/notifications';
import {
  addActivity,
  addActivityRange,
} from '../store/activities';

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
  },
  buttonInRow: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
  },
  container: {
    margin: 10,
  },
  leftButton: {
    marginRight: 5,
  },
  rightButton: {
    marginLeft: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

function ActivityFormTemplate({
  addOneActivity,
  addOneActivityRange,
  addActivityNotificationState,
  toggleActivityNotification,
  navigation,
}) {
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const [mode, setMode] = useState('date');
  const [isError, setIsError] = useState(false);
  const [checked, setChecked] = React.useState('single');

  const [activityName, setActivityName] = useState('');
  const [firstDate, setFirstDate] = useState(new Date());
  const [secondDate, setSecondDate] = useState(new Date());

  const handleActivityNameChange = (newActivityName) => {
    setIsError(newActivityName === '');
    setActivityName(newActivityName);
  };

  const onChangeFirst = (event, selectedDate) => {
    setShowFirst(false);

    if (selectedDate) {
      const currentDate = setSeconds(selectedDate, 0) || date;
      setFirstDate(currentDate);
    }
  };

  const onChangeSecond = (event, selectedDate) => {
    setShowSecond(false);

    if (selectedDate) {
      const currentDate = setSeconds(selectedDate, 0) || date;
      setSecondDate(currentDate);
    }
  };

  const showFirstDatepicker = (event, isDate) => {
    setMode(isDate ? 'date' : 'time');
    setShowFirst(true);
  };

  const showSecondDatepicker = (event, isDate) => {
    setMode(isDate ? 'date' : 'time');
    setShowSecond(true);
  };

  const handleAddActivity = (event) => {
    if (!isError) {
      if (checked === 'single') {
        addOneActivity({
          activityName,
          firstDate,
        });
      } else {
        addOneActivityRange({
          activityName,
          firstDate,
          secondDate,
        });
      }
      toggleActivityNotification(true);
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <Title>Activity Form</Title>
        <View>
          <Text>Do you want to input single date or range?</Text>
          <TouchableRipple onPress={() => setChecked('single')}>
            <View style={styles.row}>
              <View pointerEvents="none">
                <RadioButton.Android
                  value="single"
                  status={checked === 'single' ? 'checked' : 'unchecked'}
                />
              </View>
              <Text>Single date</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => setChecked('range')}>
            <View style={styles.row}>
              <View pointerEvents="none">
                <RadioButton.Android
                  value="range"
                  status={checked === 'range' ? 'checked' : 'unchecked'}
                  />
              </View>
              <Text>Range</Text>
            </View>
          </TouchableRipple>
        </View>
        <Subheading>{checked ==='range' ? 'First date' : 'Single date'}</Subheading>
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
          value={format(firstDate, 'yyyy/MM/dd, HH:mm')}
        />
        <View style={styles.buttonRow}>
          <Button
            mode="contained"
            onPress={e => showFirstDatepicker(e, true)}
            style={[styles.button, styles.buttonInRow, styles.leftButton]}
          >
            Set date
          </Button>
          <Button
            mode="contained"
            onPress={e => showFirstDatepicker(e, false)}
            style={[styles.button, styles.buttonInRow, styles.rightButton]}
          >
            Set time
          </Button>
        </View>
        {
          checked === 'range' && (
            <>
              <Subheading>Second date</Subheading>
              <TextInput
                editable={false}
                label="Activity date"
                mode="outlined"
                value={format(secondDate, 'yyyy/MM/dd, HH:mm')}
              />
              <View style={styles.buttonRow}>
                <Button
                  mode="contained"
                  onPress={e => showSecondDatepicker(e, true)}
                  style={[styles.button, styles.buttonInRow, styles.leftButton]}
                >
                  Set date
                </Button>
                <Button
                  mode="contained"
                  onPress={e => showSecondDatepicker(e, false)}
                  style={[styles.button, styles.buttonInRow, styles.rightButton]}
                >
                  Set time
                </Button>
              </View>
            </>
          )
        }
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
          duration={Snackbar.DURATION_SHORT}
          visible={addActivityNotificationState}
          onDismiss={() => toggleActivityNotification(false)}
          action={{
            label: 'Dismiss',
            onPress: () => toggleActivityNotification(false),
          }}
        >
          Added an activity
        </Snackbar>
      </View>
      <View>
      {showFirst && (
          <DateTimePicker
            display="default"
            mode={mode}
            onChange={onChangeFirst}
            value={firstDate}
          />
        )}
        {showSecond && (
          <DateTimePicker
            display="default"
            mode={mode}
            onChange={onChangeSecond}
            value={secondDate}
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
    addOneActivityRange : activity => {
      dispatch(addActivityRange(activity))
    },
    toggleActivityNotification: activityState => {
      dispatch(setActivityNotification(activityState))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityFormTemplate);

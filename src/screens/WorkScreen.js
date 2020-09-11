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
  Dialog,
  Paragraph,
  Portal
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  getMonth,
  getYear
} from 'date-fns';
import { setActivityNotification } from '../store/notifications';
import {
  addWork,
  removeWork
} from '../store/works';

const styles = StyleSheet.create({
    workContainer: {
        margin: 30
      },
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

function WorkScreen({works, activities, removeWorkX, addWorkX}) {
    const [addingState, setAddingState] = useState(false)
    const [activityName, setActivityName] = useState(null)
    const [salary, setSalary] = useState(null)

    for(let i=0; i<works.length; i++){
        works[i].monthHours = 0
        works[i].monthSalary = 0
        for(let ii=0; ii<activities.length; ii++){
            if ((activities[ii].activityName === works[i].activityName) && (getMonth(activities[ii].startDate) === getMonth(new Date)) && (getYear(activities[ii].startDate) === getYear(new Date))){
                const date1 = new Date(activities[ii].startDate)
                const date2 = new Date(activities[ii].stopDate)
                works[i].monthHours += (date2-date1)/1000/60/60
            }
        }
        works[i].monthHours = Math.round(works[i].monthHours*4)/4
        works[i].monthSalary = works[i].monthHours * works[i].salary
    }

    return (
        <View style={styles.container}>
            <Title>Work Screen</Title>
            <View>
                <Button
                    mode="contained"
                    onPress={() => setAddingState(true)}
                    style={styles.button}
                >
                    Add Work
                </Button>
            </View>
            <Portal>
            <Dialog visible={addingState} onDismiss={() => setAddingState(false)}>
            <Dialog.Title>Adding work</Dialog.Title>
            <Dialog.Content>
                <Paragraph></Paragraph>
                <TextInput
                label="Activity name"
                mode="outlined"
                onChangeText={(text) => setActivityName(text)}
                />
                <TextInput
                label="Hourly salary"
                keyboardType='numeric'
                mode="outlined"
                onChangeText={(text) => setSalary(Number(text))}
                />
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={() => { addWorkX({activityName, salary}); setAddingState(false) }}>Done</Button>
            </Dialog.Actions>
            </Dialog>
        </Portal>
        {works.map((work) => {
            return(  
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.workContainer}>
                        <Title>{work.activityName}</Title>
                        <Text>Hourly salary: {work.salary}</Text>
                        <Text>Hours in this month: {work.monthHours}</Text>
                        <Text>Salary in this month: {work.monthSalary}</Text>
                    </View>
                    <View style={styles.workContainer}>
                        <Button onPress={() => removeWorkX(work)}>
                            Remove
                        </Button>
                    </View>
                </View>       

            )
        })}
        </View>
    );
}

const mapStateToProps = state => {
  const { works, activities } = state;

  return { works, activities };
};

const mapDispatchToProps = dispatch => {
  return {
    addWorkX: work => {
      dispatch(addWork(work))
    },
    removeWorkX: work => {
      dispatch(removeWork(work))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkScreen);

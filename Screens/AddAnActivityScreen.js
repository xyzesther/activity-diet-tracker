import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import React, { useState, useContext } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEntries } from '../Components/EntriesContext';
import { colors } from '../Colors';


export default function AddAnActivityScreen( { navigation }) {
  const { addExerciseEntry } = useEntries();
  const [activityType, setActivityType] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Walking', value: 'walking' },
    { label: 'Running', value: 'running' },
    { label: 'Swimming', value: 'swimming' },
    { label: 'Weights', value: 'weights' },
    { label: 'Yoga', value: 'yoga' },
    { label: 'Cycling', value: 'cycling' },
    { label: 'Hiking', value: 'hiking' },
  ]);

  function validateInputs() {
    if (!activityType || !duration || !date) {
      Alert.alert('Invalid input', 'Please check your input values');
      return false;
    }
    if (isNaN(duration) || duration <= 0) {
      Alert.alert('Error', 'Please enter a valid duration (positive number).');
      return false;
    }
    return true;
  }

  function handleAddActivity() {
    if (!validateInputs()) {
      return;
    }
    const newEntry = {
      id: Math.random().toString(),
      type: activityType,
      duration: parseInt(duration),
      date: date.toISOString(),
      special: (activityType === 'Running' || activityType === 'Weights') && parseInt(duration) > 60,
    };

    addExerciseEntry(newEntry);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Activity</Text>

      <Text style={styles.label}>Activity *</Text>
      <DropDownPicker
        open={open}
        value={activityType}
        items={items}
        setOpen={setOpen}
        setValue={setActivityType}
        setItems={setItems}
        placeholder="Select an activity"
        containerStyle={styles.dropdown}
      />

      <Text style={styles.label}>Duration (min)*</Text>
      <TextInput
        style={styles.input}
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Date *</Text>
      <TextInput
        style={styles.input}
        value={date.toDateString()}
        onFocus={() => setShowDatePicker(true)}
      />
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="inline"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={handleAddActivity} />
        <Button
          title="Cancel"
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

})
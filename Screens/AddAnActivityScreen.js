import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { EntriesContext } from '../Components/EntriesContext';
import { colors } from '../Colors';

export default function AddAnActivityScreen( { navigation }) {
  const { addNewEntry } = useContext(EntriesContext);
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

  const validateInputs = () => {
    if (!activityType || !duration || !date) {
      Alert.alert('Invalid input', 'Please check your input values');
      return false;
    }
    return true;
  };

  function handleAddActivity() {
    if (validateInputs()) {
      const newEntry = {
        type: 'exercise',
        id: Date.now(),
        name: activityType,
        details: `${duration} min`,
        date: date.toISOString().split('T')[0],
        isSpecial: (activityType === 'running' || activityType === 'weights') && parseInt(duration) > 60,
      };

      addNewEntry('exercise', newEntry);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.label}>Activity *</Text>
      <DropDownPicker
        open={open}
        value={activityType}
        items={items}
        setOpen={setOpen}
        setValue={setActivityType}
        setItems={setItems}
        style={styles.dropdown}
        placeholder="Select An Activity"
        textStyle={styles.dropdownText}
        dropDownContainerStyle={styles.dropdownContainer}
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
        <View style={styles.button}>
          <Button title="Cancel" onPress={() => navigation.goBack()} />
        </View>
        <View style={styles.button}>
          <Button title="Save" onPress={handleAddActivity} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: colors.primary,
  },
  dropdown: {
    marginBottom: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 5,
    backgroundColor: colors.background,
  },
  dropdownText: {
    color: colors.primary,
  },
  dropdownContainer: {
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 5,
    backgroundColor: colors.background,
  },
  input: {
    height: 40,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: colors.primary,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',  
  },

  button: {
    width: '40%',
  },
});
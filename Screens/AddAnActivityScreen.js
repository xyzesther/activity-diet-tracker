import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { EntriesContext } from '../Components/EntriesContext';
import { colors, spacing, fontSize, borderRadius, borderWidth } from '../styles/styles';
import { useTheme } from '../Components/ThemeContext';

export default function AddAnActivityScreen( { navigation }) {
  const { addNewEntry } = useContext(EntriesContext);
  const [activityType, setActivityType] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Walking', value: 'Walking' },
    { label: 'Running', value: 'Running' },
    { label: 'Swimming', value: 'Swimming' },
    { label: 'Weights', value: 'Weights' },
    { label: 'Yoga', value: 'Yoga' },
    { label: 'Cycling', value: 'Cycling' },
    { label: 'Hiking', value: 'Hiking' },
  ]);

  const { theme } = useTheme();

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
        date: date.toDateString(),
        isSpecial: (activityType === 'Running' || activityType === 'Weights') && parseInt(duration) > 60,
      };

      addNewEntry('exercise', newEntry);
      navigation.goBack();
    }
  };

  return (
    
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.label, { color: theme.textColor }]}>Activity *</Text>
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

      <Text style={[styles.label, { color: theme.textColor }]}>Duration (min)*</Text>
      <TextInput
        style={styles.input}
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
      />

      <Text style={[styles.label, { color: theme.textColor }]}>Date *</Text>
      <TextInput
        style={styles.input}
        value={date ? date.toDateString() : ''}
        onPressIn={() => {
          showDatePicker ? setShowDatePicker(false) : setShowDatePicker(true);
          if (!date) { 
            setDate(new Date()); 
          }
        }}
      />
      {showDatePicker && (
        <DateTimePicker
          value={date || new Date()}
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
    padding: spacing.large,
  },
  label: {
    fontSize: fontSize.subtitle,
    fontWeight: 'bold',
    marginBottom: spacing.small,
  },
  dropdown: {
    marginBottom: spacing.large,
    borderWidth: borderWidth.medium,
    borderColor: colors.primary,
    borderRadius: borderRadius.medium,
    backgroundColor: colors.background.secondary,
  },
  dropdownText: {
    color: colors.primary,
  },
  dropdownContainer: {
    borderWidth: borderWidth.small,
    borderColor: colors.primary,
    borderRadius: borderRadius.medium,
    backgroundColor: colors.background.white,
  },
  input: {
    height: 40,
    borderWidth: borderWidth.medium,
    borderColor: colors.primary,
    borderRadius: borderRadius.medium,
    paddingHorizontal: spacing.medium,
    marginBottom: spacing.large,
    color: colors.primary,
    backgroundColor: colors.background.secondary,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.small,
  },

  button: {
    width: '30%',
    marginHorizontal: spacing.large,
  },
});
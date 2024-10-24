import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors, spacing, fontSize, borderRadius, borderWidth } from '../styles/styles';
import { useTheme } from '../Components/ThemeContext';
import PressableButton from '../Components/PressableButton';
import { writeEntryToDB } from '../Firebase/firestoreHelper';

export default function AddAnActivityScreen( { navigation }) {
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

  // Validate inputs
  const validateInputs = () => {
    if (!activityType || !duration || !date) {
      Alert.alert('Invalid input', 'Please check your input values');
      return false;
    }
    return true;
  };

  // Handle adding a new activity entry
  async function handleAddActivity() {
    if (validateInputs()) {
      const newEntry = {
        id: Date.now(),
        name: activityType,
        details: `${duration} min`,
        date: date.toDateString(),
        isSpecial: (activityType === 'Running' || activityType === 'Weights') && parseInt(duration) > 60,
      };

      try {
        await writeEntryToDB('exercise', newEntry);
        navigation.goBack();
      } catch (error) {
        console.log('Error adding a new activity: ', error);
      }
    }
  };

  return (
    
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Activity */}
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

      {/* Duration */}
      <Text style={[styles.label, { color: theme.textColor }]}>Duration (min)*</Text>
      <TextInput
        style={styles.input}
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
        blurOnSubmit={true}
      />

      {/* Date */}
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
        editable={false}
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

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <PressableButton 
          pressedFunction={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </PressableButton>
        <PressableButton 
          pressedFunction={handleAddActivity}
        >
          <Text style={styles.buttonText}>Save</Text>
        </PressableButton>
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
  buttonText: {
    fontSize: fontSize.subtitle,
    color: colors.text.primary,
  },
});
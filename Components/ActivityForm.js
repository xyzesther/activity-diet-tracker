import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import PressableButton from './PressableButton';
import { colors, spacing, fontSize, borderRadius, borderWidth } from '../styles/styles';
import { useTheme } from './ThemeContext';

export default function ActivityForm({ initialData={}, onSubmit, onCancel, isEditMode=false }) {
  const { theme } = useTheme();
  const [activityType, setActivityType] = useState(initialData.activityType || '');
  const [duration, setDuration] = useState(initialData.duration || '');
  const [date, setDate] = useState(initialData.date ? new Date(initialData.date) : null);
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

  // Validate inputs
  function validateInputs() {
    if (!activityType || !duration || !date) {
      Alert.alert('Invalid input', 'Please check your input values');
      return false;
    }
    return true;
  };

  // Handle form submission
  async function handleSubmit() {
    if (validateInputs()) {
      const entryData = {
        name: activityType,
        details: `${duration} min`,
        date: date.toDateString(),
        isSpecial: (activityType === 'Running' || activityType === 'Weights') && parseInt(duration) > 60,
      };
      onSubmit(entryData);
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
          pressedFunction={onCancel}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </PressableButton>
        <PressableButton 
          pressedFunction={handleSubmit}
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

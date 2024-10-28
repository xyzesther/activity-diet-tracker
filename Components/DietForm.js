import { StyleSheet, Text, View, TextInput, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors, spacing, fontSize, borderRadius, borderWidth } from '../styles/styles';
import { useTheme } from '../Components/ThemeContext';
import PressableButton from '../Components/PressableButton';
import Checkbox from 'expo-checkbox';

export default function AddDietScreen({ initialData, onSubmit, onCancel, isEditMode=false }) {
  const { theme } = useTheme();
  const [dietDescription, setDietDescription] = useState('');
  const [dietCalories, setDietCalories] = useState('');
  const [dietDate, setDietDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSpecial, setIsSpecial] = useState(false);
  const [removeSpecial, setRemoveSpecial] = useState(false);

  useEffect(() => {
    // update the form fields when data is passed in
    if (initialData) {
      setDietDescription(initialData.description);
      setDietCalories(initialData.calories);
      setDietDate(initialData.date ? new Date(initialData.date) : null);
      setIsSpecial(initialData.isSpecial);
    }
  }, [initialData]);

  // Validate inputs
  const validateInputs = () => {
    if (!dietDescription || !dietDate || !dietCalories || isNaN(dietCalories) || Number(dietCalories) < 0) {
      Alert.alert('Invalid input', 'Please check your input values');
      return false;
    }
    return true;
  };

  // Handle form submission
  async function handleSubmitDiet() {
    if (validateInputs()) {
      // Update isSpecial based on the checkbox value
      const updatedIsSpecial = isEditMode 
      ? (removeSpecial ? false : dietCalories > 800)
      : dietCalories > 800;

      const entryData = {
        description: dietDescription,
        calories: dietCalories,
        date: dietDate.toDateString(),
        isSpecial: updatedIsSpecial,
      }

      // Show an alert if the user is in edit mode
      if (isEditMode) {
        Alert.alert(
          'Important',
          'Are you sure you want to save these changes?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Yes', onPress: () => onSubmit(entryData) },
          ]
        );
      } else {
        onSubmit(entryData);
      }
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Description */}
      <Text style={[styles.label, { color: theme.textColor }]}>Description *</Text>
      <TextInput
        style={styles.descriptionInput}
        value={dietDescription}
        onChangeText={(text) => setDietDescription(text)}
        multiline={true}
        textAlignVertical='top'
      />

      {/* Calories */}
      <Text style={[styles.label, { color: theme.textColor }]}>Calories *</Text>
      <TextInput
        style={styles.input}
        value={dietCalories}
        onChangeText={(text) => setDietCalories(text)}
        keyboardType='numeric'
      />

      {/* Date */}
      <Text style={[styles.label, { color: theme.textColor }]}>Date *</Text>
      <TextInput
        style={styles.input}
        value={dietDate ? dietDate.toDateString() : ''}
        onPressIn={() => {
          showDatePicker ? setShowDatePicker(false) : setShowDatePicker(true);
          if (!dietDate) { 
            setDietDate(new Date()); 
          }
        }}
        editable={false}
      />
      {showDatePicker && (
        <DateTimePicker
          value={dietDate || new Date()}
          mode="date"
          display="inline"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDietDate(selectedDate);
          }}
        />
      )}

      {/* Edit Mode has a checkbox for special entry*/}
      {isEditMode && isSpecial && (
        <View style={styles.checkboxContainer}>
          <Text style={ styles.checkboxLabel }>
            This item is marked as special. 
            Select the checkbox if you would like to remove it.
          </Text>
          <Checkbox
            value={removeSpecial}
            onValueChange={setRemoveSpecial}
            style={styles.checkbox}
          />
        </View>
      )}

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <PressableButton pressedFunction={onCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </PressableButton>
        <PressableButton pressedFunction={handleSubmitDiet}>
          <Text style={styles.buttonText}>Save</Text>
        </PressableButton>
      </View>
    </View>
  )
    
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

  descriptionInput: {
    height: 80,
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

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.large,
    padding: spacing.small,
  },

  checkboxLabel: {
    fontWeight: 'bold',
    color: colors.primary,
  },

  checkbox: {
    margin: spacing.medium,
  },
});

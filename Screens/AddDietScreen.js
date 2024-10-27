import React from 'react'
import { writeEntryToDB } from '../Firebase/firestoreHelper';
import DietForm from '../Components/DietForm';

export default function AddDietScreen({ navigation }) {
  async function handleAddDiet() {
    try {
      const newEntry = { id: Date.now(), ...entryData };
      await writeEntryToDB('diet', newEntry);
      navigation.goBack();
    } catch (error) {
      console.log('Error adding a new diet: ', error);
    }
  };

  return (
    <DietForm
      onSubmit={handleAddDiet}
      onCancel={() => navigation.goBack()}
      isEditMode={false}
    />
  );
}

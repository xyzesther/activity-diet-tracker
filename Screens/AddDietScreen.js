import React from 'react'
import { writeEntryToDB } from '../Firebase/firestoreHelper';
import DietForm from '../Components/DietForm';

export default function AddDietScreen({ navigation }) {

  async function handleAddDiet(entryData) {
    try {
      await writeEntryToDB('diet', entryData);
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

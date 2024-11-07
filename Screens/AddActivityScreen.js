import React from 'react';
import ActivityForm from '../Components/ActivityForm';
import { writeEntryToDB } from '../Firebase/firestoreHelper';

export default function AddAnActivityScreen( { navigation }) {

  async function handleAddActivity(entryData) {
    try {
      await writeEntryToDB('exercise', entryData);
      navigation.goBack();
    } catch (error) {
      console.log('Error adding a new activity: ', error);
    }
  };

  return (
    <ActivityForm
      onSubmit={handleAddActivity}
      onCancel={() => navigation.goBack()}
      isEditMode={false}
    />
  );
}

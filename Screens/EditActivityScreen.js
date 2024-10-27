import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import ActivityForm from '../Components/ActivityForm';
import { getAnEntryFromDB, updateEntryInDB } from '../Firebase/firestoreHelper';

export default function EditActivityScreen({ route, navigation }) {
  const { entryId } = route.params;
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    async function fetchActivity() {
      try {
        const activity = await getAnEntryFromDB('exercise', entryId);
        setInitialData(activity);
      } catch (error) {
        console.log('Error fetching the activity data: ', error);
      }
    }
    fetchActivity();
  }, [entryId]);

  // Call the updateEntryInDB function to update the activity in the database
  async function handleEditActivity(updatedData) {
    try {
      await updateEntryInDB('exercise', entryId, updatedData);
      navigation.goBack();
    } catch (error) {
      console.log('Error updating the activity: ', error);
    }
  }

  return (
    <ActivityForm
      initialData={initialData}
      onSubmit={handleEditActivity} 
      onCancel={() => navigation.goBack()} 
      isEditMode={true}
    />
  );
}

const styles = StyleSheet.create({})
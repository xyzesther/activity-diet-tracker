import React, { useEffect, useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import ActivityForm from '../Components/ActivityForm';
import { getAnEntryFromDB, updateEntryInDB, deleteEntryFromDB } from '../Firebase/firestoreHelper';
import FontAwesome from '@expo/vector-icons/FontAwesome';

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

  // Call the deleteEntryFromDB function to delete the activity from the database
  async function handleDeleteActivity() {
    try {
      await deleteEntryFromDB('exercise', entryId);
      navigation.goBack();
    } catch (error) {
      console.log('Error deleting the activity: ', error);
    }
  }

  // Show an Alert to comfirm before deleting the activity
  function confirmDeleteActivity() {
    Alert.alert(
      'Delete',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: handleDeleteActivity },
      ]
    );
  }

  // Set the headerRight button to delete the activity
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <FontAwesome
          name="trash-o"
          size={24}
          color="white"
          onPress={confirmDeleteActivity}
          style={{ marginRight: 15 }}
        />
      ),
    });
  }, [navigation]);

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
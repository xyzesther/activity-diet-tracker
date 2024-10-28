import React, { useEffect, useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import DietForm from '../Components/DietForm';
import { getAnEntryFromDB, updateEntryInDB, deleteEntryFromDB } from '../Firebase/firestoreHelper';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function EditDietScreen({ route, navigation }) {
  const { entryId } = route.params;
  const [initialData, setInitialData] = useState(null);
  
  useEffect(() => {
    async function fetchDiet() {
      try {
        const diet = await getAnEntryFromDB('diet', entryId);
        setInitialData(diet);
      } catch (error) {
        console.log('Error fetching the diet data: ', error);
      }
    }
    fetchDiet();
  }, [entryId]);

  // Call the updateEntryInDB function to update the diet in the database
  async function handleEditDiet(updatedData) {
    try {
      await updateEntryInDB('diet', entryId, updatedData);
      navigation.goBack();
    } catch (error) {
      console.log('Error updating the diet: ', error);
    }
  }

    // Call the deleteEntryFromDB function to delete the diet from the database
    async function handleDeleteDiet() {
      try {
        await deleteEntryFromDB('diet', entryId);
        navigation.goBack();
      } catch (error) {
        console.log('Error deleting the diet: ', error);
      }
    }
  
    // Show an Alert to confirm before deleting the activity
    function confirmDeleteDiet() {
      Alert.alert(
        'Delete',
        'Are you sure you want to delete this item?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Delete', style: 'destructive', onPress: handleDeleteDiet },
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
            onPress={confirmDeleteDiet}
            style={{ marginRight: 15 }}
          />
        ),
      });
    }, [navigation]);

  return (
    <DietForm
      initialData={initialData}
      onSubmit={handleEditDiet} 
      onCancel={() => navigation.goBack()} 
      isEditMode={true}
    />
  )
}

const styles = StyleSheet.create({})
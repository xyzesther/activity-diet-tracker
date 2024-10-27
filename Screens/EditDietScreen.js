import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import DietForm from '../Components/DietForm';
import { getAnEntryFromDB, updateEntryInDB } from '../Firebase/firestoreHelper';

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
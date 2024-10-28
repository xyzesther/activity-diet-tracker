import { StyleSheet, View, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { spacing } from '../styles/styles'
import ItemsList from '../Components/ItemsList'
import { useTheme } from '../Components/ThemeContext';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function DietScreen({ navigation }) {
  const { theme } = useTheme();

  useEffect(() => {
    navigation.setOptions({
      title: 'Diet',
      headerRight: () => (
        <Pressable style={styles.addIcon} onPress={() => navigation.navigate('Add A Diet Entry')} >
          <FontAwesome6 
            name="add" 
            size={20} 
            color="white"
          />
          <MaterialIcons 
            name="fastfood" 
            size={24} 
            color="white"
          />
        </Pressable>
      ),
    })
  }, [navigation])

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ItemsList type='diet' navigation={navigation}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.large,
  },

  addIcon: {
    flexDirection: 'row',
    marginRight: spacing.large,
    alignItems: 'center',
    gap: 5,
  }, 
})
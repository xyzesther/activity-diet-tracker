import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import { spacing } from '../styles/styles'
import ItemsList from '../Components/ItemsList'
import { useTheme } from '../Components/ThemeContext';

export default function ActivitiesScreen({ navigation }) {
  const { theme } = useTheme();
  
  useEffect(() => {
    navigation.setOptions({
      title: 'Activities',
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Add An Activity')
          }}
        >
          <Image
            source={require('../assets/add.png')}
            alt='an add button'
            style={styles.image}
          />
        </TouchableOpacity>
      ),
    })
  }, [navigation])

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ItemsList type='exercise' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.large,
  },
  image: {
    width: 20,
    height: 20,
    marginRight: spacing.medium,
  }
})
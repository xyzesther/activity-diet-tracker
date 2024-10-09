import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { spacing } from '../styles/styles'
import ItemsList from '../Components/ItemsList'
import { useTheme } from '../Components/ThemeContext';

export default function DietScreen({ navigation }) {
  const { theme } = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Diet',
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Add A Diet Entry')
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
      <ItemsList type='diet' />
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
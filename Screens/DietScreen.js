import { StyleSheet, View, Button } from 'react-native'
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
        <Button
          title="Add"
          onPress={() => {
            navigation.navigate('Add A Diet Entry')
          }}
        />
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
  }
})
import { StyleSheet, View, Button } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { colors, spacing } from '../styles/styles'
import ItemsList from '../Components/ItemsList'

export default function DietScreen({ navigation }) {
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
    <View style={styles.container}>
      <ItemsList type='diet' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    padding: spacing.large,
  }
})
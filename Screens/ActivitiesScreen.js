import { StyleSheet, View, Button } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { colors, spacing } from '../styles/styles'
import ItemsList from '../Components/ItemsList'

export default function ActivitiesScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Activities',
      headerRight: () => (
        <Button
          title="Add"
          onPress={() => {
            navigation.navigate('Add An Activity')
          }}
        />
      ),
    })
  }, [navigation])

  return (
    <View style={styles.container}>
      <ItemsList type='exercise' />
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
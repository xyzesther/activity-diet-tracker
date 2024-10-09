import { StyleSheet, View, Button } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { colors } from '../Colors'
import ItemsList from '../Components/ItemsList'

export default function ActivitiesScreen({ navigation }) {
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
    backgroundColor: colors.background,
    padding: 20,
  }
})
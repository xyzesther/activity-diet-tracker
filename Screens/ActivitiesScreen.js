import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { colors } from '../Colors'

export default function ActivitiesScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Activities',
      headerRight: () => (
        <Button
          title="Add"
          onPress={() => {
            navigation.navigate('AddAnActivity')
          }}
        />
      ),
    })
  }, [navigation])

  return (
    <View style={styles.container}>
      <Text>ActivitiesScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
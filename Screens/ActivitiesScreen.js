import { StyleSheet, View, Button } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { spacing } from '../styles/styles'
import ItemsList from '../Components/ItemsList'
import { useTheme } from '../Components/ThemeContext';

export default function ActivitiesScreen({ navigation }) {
  const { theme } = useTheme();

  console.log('Current theme:', theme);

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
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ItemsList type='exercise' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.large,
  }
})
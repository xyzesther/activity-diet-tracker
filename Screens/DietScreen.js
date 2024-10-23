import { StyleSheet, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { spacing } from '../styles/styles'
import ItemsList from '../Components/ItemsList'
import { useTheme } from '../Components/ThemeContext';
import PressableButton from '../Components/PressableButton';

export default function DietScreen({ navigation }) {
  const { theme } = useTheme();

  useEffect(() => {
    navigation.setOptions({
      title: 'Diet',
      headerRight: () => (
        <PressableButton
          pressedFunction={() => {
            navigation.navigate('Add A Diet Entry')
          }}
          style={styles.button}
          pressedStyle={styles.pressedButton}
        >
          <Image
            source={require('../assets/add.png')}
            alt='an add button'
            style={styles.image}
          />
        </PressableButton>
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
  button: {
    marginRight: spacing.small,
  },
  pressedButton: {
    opacity: 0,
  },
  image: {
    width: 20,
    height: 20,
    marginRight: spacing.medium,
  }
})
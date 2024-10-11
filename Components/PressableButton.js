import { Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import { colors, fontSize, spacing } from '../styles/styles'

export default function PressableButton({ pressedFunction, style, pressedStyle, children }) {
  return (
    <Pressable
      onPress={pressedFunction}
      style={({ pressed }) => {
        return [
          styles.defaultStyle,
          style, 
          pressed && styles.defaultPressedStyle,
          pressed && pressedStyle
        ]
      }}
    >
      
      <View>{children}</View>
    </Pressable>

  )
}

const styles = StyleSheet.create({
  defaultStyle: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: colors.primary,
    marginHorizontal: spacing.large,
    color: colors.text.primary,
  },
  defaultPressedStyle: {
    backgroundColor: colors.background.dark,
    opacity: 0.5,
  },
})
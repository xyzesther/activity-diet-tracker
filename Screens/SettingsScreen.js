import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from '../Components/ThemeContext';
import { colors, fontSize } from '../styles/styles';
import PressableButton from '../Components/PressableButton';

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <PressableButton pressedFunction={toggleTheme}>
        <Text style={styles.buttonText}>Toggle Theme</Text>
      </PressableButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: fontSize.subtitle,
    color: colors.text.primary,
  },
});
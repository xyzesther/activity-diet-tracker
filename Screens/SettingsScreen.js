import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { useTheme } from '../Components/ThemeContext';
import { colors, spacing } from '../styles/styles';

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.themeButtonContainer}>
        <Button 
          title="Toggle Theme" 
          onPress={toggleTheme} 
          color={colors.text.primary}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  themeButtonContainer: {
    backgroundColor: colors.primary,
    borderRadius: spacing.medium,
    padding: spacing.small,
  },
});
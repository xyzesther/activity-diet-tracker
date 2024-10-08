import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ActivitiesScreen from './Screens/ActivitiesScreen';
import DietScreen from './Screens/DietScreen';
import SettingsScreen from './Screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Activities') {
              iconName = focused ? 'directions-run' : 'directions-run';
            } else if (route.name === 'Diet') {
              iconName = focused ? 'fastfood' : 'fastfood';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings';
            }

            return <MaterialIcons name={iconName} size={size} color={color}/>;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Activities" component={ActivitiesScreen} />
        <Tab.Screen name="Diet" component={DietScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

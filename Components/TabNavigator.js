import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ActivitiesScreen from '../Screens/ActivitiesScreen';
import DietScreen from '../Screens/DietScreen';
import SettingsScreen from '../Screens/SettingsScreen';
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../styles/styles'

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Activities') {
            iconName = 'directions-run';
          } else if (route.name === 'Diet') {
            iconName = 'fastfood';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }

          return <MaterialIcons name={iconName} size={size} color={color}/>;
        },
        tabBarActiveTintColor: colors.tabBarActive,
        tabBarInactiveTintColor: colors.disabled,
        tabBarStyle: {backgroundColor: colors.primary},
        headerStyle: {backgroundColor: colors.primary},
        headerTintColor: colors.text.primary, 
      })
    }
    >
      <Tab.Screen name="Activities" component={ActivitiesScreen} />
      <Tab.Screen name="Diet" component={DietScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
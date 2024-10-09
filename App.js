import { StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ActivitiesScreen from './Screens/ActivitiesScreen';
import DietScreen from './Screens/DietScreen';
import SettingsScreen from './Screens/SettingsScreen';
import AddActivitiesScreen from './Screens/AddActivitiesScreen';
import AddDietScreen from './Screens/AddDietScreen';
import { colors } from './colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
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

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: colors.primary},
          headerTintColor: colors.text.primary,
        }}
      >
        <Stack.Screen 
          name="BottomTab" 
          component={BottomTabNavigator} 
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Add An Activity" component={AddActivitiesScreen} />
        <Stack.Screen name="Add A Diet Entry" component={AddDietScreen} />
      </Stack.Navigator>
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

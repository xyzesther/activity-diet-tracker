import { StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './Components/TabNavigator';
import AddAnActivityScreen from './Screens/AddAnActivityScreen';
import AddDietScreen from './Screens/AddDietScreen';
import { colors } from './Colors';
import { EntriesProvider } from './Components/EntriesContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <EntriesProvider>
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
            options={({ route }) => ({
              title: getHeaderTitle(route),
              headerShown: false 
            })}
          />
          <Stack.Screen name="Add An Activity" component={AddAnActivityScreen} />
          <Stack.Screen name="Add A Diet Entry" component={AddDietScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </EntriesProvider>
  );
}

const getHeaderTitle = (route) => {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : 'Activities';

  switch (routeName) {
    case 'Activities':
      return 'Activities';
    case 'Diet':
      return 'Diet';
    case 'Settings':
      return 'Settings';
    default:
      return 'Home';
  }
};

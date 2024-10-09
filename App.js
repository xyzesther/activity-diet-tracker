import { StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './Components/TabNavigator';
import AddAnActivityScreen from './Screens/AddAnActivityScreen';
import AddADietEntryScreen from './Screens/AddADietEntryScreen';
import { colors } from './Colors';

const Stack = createNativeStackNavigator();

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
          options={({ route }) => ({
            title: getHeaderTitle(route),
            headerShown: false 
          })}
        />
        <Stack.Screen name="AddAnActivity" component={AddAnActivityScreen} />
        <Stack.Screen name="AddADietEntry" component={AddADietEntryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

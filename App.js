import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './Components/TabNavigator';
import AddAnActivityScreen from './Screens/AddAnActivityScreen';
import AddDietScreen from './Screens/AddDietScreen';
import EditActivityScreen from './Screens/EditActivityScreen';
import EditDietScreen from './Screens/EditDietScreen';
import { colors } from './styles/styles';
import { ThemeProvider } from './Components/ThemeContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
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
          <Stack.Screen 
            name="Add An Activity" 
            component={AddAnActivityScreen}
            options={{
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen 
            name="Add A Diet Entry" 
            component={AddDietScreen}
            options={{
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen 
            name="Edit Activity" 
            component={EditActivityScreen}
            options={{
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen 
            name="Edit Diet" 
            component={EditDietScreen}
            options={{
              headerBackTitleVisible: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>

    </ThemeProvider>
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

import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Main from './screens/Main'
import AboutCountry from './screens/AboutCountry'
import {enableScreens} from 'react-native-screens'

enableScreens()

const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions = {{
        header: (props) => null
      }}>
        <Stack.Screen name = "Main" component = {Main} />
        <Stack.Screen name = "About" component = {AboutCountry} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

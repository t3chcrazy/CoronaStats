import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Main from './screens/Main'

const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions = {{
        header: (props) => null
      }}>
        <Stack.Screen name = "Main" component = {Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

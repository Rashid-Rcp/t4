import 'react-native-gesture-handler';

import React from 'react';
import { } from 'react-native';

import Home from './screens/Home';
import Account from './screens/Account'
//import Test from './screens/Test'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export default function App() {
  return (
   <NavigationContainer>
    <Stack.Navigator initialRouteName={'Account'}>
      <Stack.Screen options={{headerShown: false}} name="Home" component={Home} />
      <Stack.Screen name="Account" component={Account} />
    </Stack.Navigator>
  </NavigationContainer> 
 
      
  );
}

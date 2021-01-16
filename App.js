import 'react-native-gesture-handler';

import React from 'react';
import { } from 'react-native';

import Home from './screens/Home';
import Offers from './screens/Offers';
import Account from './screens/Account'
import AddNewProduct from './screens/account/add-new/AddNewProduct'
import AddNewOffer from './screens/account/add-new/AddNewOffer'
import EditProfile from './screens/account/edit/EditProfile'
import EditContact from './screens/account/edit/EditContact'
import SingleProduct from './screens/account/SingleProduct'
import SingleOffer from './screens/account/SingleOffer'
//import Test from './screens/Test'

import {UserProvider, userProvider} from './screens/common/UserContext'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'Account'}>
          <Stack.Screen options={{headerShown: false}} name="Home" component={Home} />
          <Stack.Screen options={{headerShown: false}} name="Offers" component={Offers} />
          <Stack.Screen name="Account" component={Account} />
          <Stack.Screen name="EditProfile" component={EditProfile} options={{ title: 'Edit Profile' }}/>
          <Stack.Screen name="EditContact" component={EditContact} options={{ title: 'Edit Contact' }}/>
          <Stack.Screen name="AddNewProduct" component={AddNewProduct} options={{ title: 'Add New Product' }} />
          <Stack.Screen name="AddNewOffer" component={AddNewOffer} options={{ title: 'Add New Offer' }} />
          <Stack.Screen name="SingleProduct" component={SingleProduct} options={{ title: 'Product Details' }} />
          <Stack.Screen name="SingleOffer" component={SingleOffer} options={{ title: 'Offer Details' }} />
        </Stack.Navigator>
      </NavigationContainer> 
    </UserProvider>
      
  );
}

import 'react-native-gesture-handler';

import React from 'react';
import { } from 'react-native';
import FlashMessage from "react-native-flash-message";

import Home from './screens/Home';
import Trends from './screens/Trends';
import TrendDetails from './screens/trends/TrendDetails';
import Search from './screens/Search';
import Holdings from './screens/Holdings';
import Offers from './screens/Offers';
import Account from './screens/Account'
import AddNewProduct from './screens/account/add-new/AddNewProduct'
import AddNewOffer from './screens/account/add-new/AddNewOffer'
import EditProfile from './screens/account/edit/EditProfile'
import EditContact from './screens/account/edit/EditContact'
import SingleProduct from './screens/account/SingleProduct'
import SingleOffer from './screens/account/SingleOffer'
import Register from './screens/common/Register'
import Comments from './screens/common/Comments'
//import Test from './screens/Test'

import {UserProvider} from './screens/common/UserContext'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function App() {
  global.APILink = 'http://192.168.43.50:80/t4-laravel/app/public/api';
  global.serverPublic = 'http://192.168.43.50:80/t4-laravel/app/public';
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'Account'}>
          {/* <Stack.Screen options={{headerShown: false}} name="Test" component={Test} /> */}
          <Stack.Screen options={{headerShown: false}} name="Home" component={Home} />
          <Stack.Screen options={{headerShown: false}} name="Trends" component={Trends} />
          <Stack.Screen options={{ title: 'Products' }} name="TrendDetails" component={TrendDetails} />
          <Stack.Screen options={{headerShown: false}} name="Search" component={Search} />
          <Stack.Screen options={{headerShown: false}} name="Holdings" component={Holdings} />
          <Stack.Screen options={{headerShown: false}} name="Offers" component={Offers} />
          <Stack.Screen name="Comments" component={Comments} />
          <Stack.Screen name="Account" component={Account} />
          <Stack.Screen name="Register" component={Register} options={{ title: 'Create new account' }}/>
          <Stack.Screen name="EditProfile" component={EditProfile} options={{ title: 'Edit Profile' }}/>
          <Stack.Screen name="EditContact" component={EditContact} options={{ title: 'Edit Contact' }}/>
          <Stack.Screen name="AddNewProduct" component={AddNewProduct} options={{ title: 'Add New Product' }} />
          <Stack.Screen name="AddNewOffer" component={AddNewOffer} options={{ title: 'Add New Offer' }} />
          <Stack.Screen name="SingleProduct" component={SingleProduct} options={{ title: 'Product Details' }} />
          <Stack.Screen name="SingleOffer" component={SingleOffer} options={{ title: 'Offer Details' }} />
        </Stack.Navigator>
        <FlashMessage position="top" />
      </NavigationContainer> 
    </UserProvider>
      
  );
}

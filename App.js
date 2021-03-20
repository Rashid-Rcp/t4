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
import DeleteAccount from './screens/account/DeleteAccount'
import SingleProduct from './screens/account/SingleProduct'
import SingleOffer from './screens/account/SingleOffer'
import Register from './screens/common/Register'
import Comments from './screens/common/Comments'
import PrivacyPolicy from "./screens/privacyTerms/PrivacyPolicy";
import TermsConditions from "./screens/privacyTerms/TermsConditions";
//import Test from './screens/Test'

import {UserProvider} from './screens/common/UserContext'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function App() {

 global.APILink = 'http://192.168.43.50:80/t4-laravel/app/public/api';
 global.shareLink = 'http://192.168.43.50:80/t4-laravel/app/public/t4_show_item';
 global.serverPublic = 'http://192.168.43.50:80/t4-laravel/app/public';

  // global.APILink = 'https://dhub.in/t4/public/api';
  // global.shareLink = 'https://dhub.in/t4/public/t4_show_item';
  // global.serverPublic = 'https://dhub.in/t4/public';

  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'Home'}>
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
          <Stack.Screen name="DeleteAccount" component={DeleteAccount} options={{ title: 'Delete Account' }}/>
          <Stack.Screen name="AddNewProduct" component={AddNewProduct} options={{ title: 'Add New Product' }} />
          <Stack.Screen name="AddNewOffer" component={AddNewOffer} options={{ title: 'Add New Offer' }} />
          <Stack.Screen name="SingleProduct" component={SingleProduct} options={{ title: 'Product Details' }} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ title: 'Privacy Policy' }} />
          <Stack.Screen name="TermsConditions" component={TermsConditions} options={{ title: 'Terms & Conditions' }} />
        </Stack.Navigator>
        <FlashMessage position="top" />
      </NavigationContainer> 
    </UserProvider>
      
  );
}

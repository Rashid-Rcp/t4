import React from 'react';
import { StyleSheet, View, StatusBar,TouchableWithoutFeedback, Keyboard } from 'react-native';

import Header from './common/Header';

import Footer from './common/Footer';
import OffersContent from './offers/OffersContent';

export default function Offers({ navigation }) {
  return (
    // <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
      <View style={styles.container}>
        <StatusBar style="auto"/>
        <Header navigation={navigation}/>
        <View style={styles.divider}></View>
        <OffersContent navigation={navigation}/>
        <Footer navigation={navigation}/>
      </View>
    // </TouchableWithoutFeedback>
  );
}


const styles = StyleSheet.create({
  container: {
     flex: 1,
     backgroundColor:'#fff',
  },
  divider:{
    height:1,
    borderTopWidth:.5,
    borderTopColor:'#ccc',
  }

});
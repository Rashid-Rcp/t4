import React from 'react';
import { StyleSheet, View, StatusBar,TouchableWithoutFeedback, Keyboard } from 'react-native';

import Header from './common/Header';
import KeywordTab from './home/KeywordTab';
import Footer from './common/Footer';
import Login from './common/Login'
import NewFeeds from './home/NewFeeds';

export default function Home({ navigation }) {
  return (
    // <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
      <View style={styles.container}>
        <StatusBar style="auto"/>
        <Header navigation={navigation}/>
        <KeywordTab/>
        <NewFeeds itemType={{type:'product'}}/>
        <Footer navigation = {navigation}/>
        {/* <Login navigation={navigation}/> */}
      </View>
    // </TouchableWithoutFeedback>
  );
}


const styles = StyleSheet.create({
  container: {
     flex: 1,
     backgroundColor:'#fff',
  },
  keyTab:{
    flex: 1,
     flexDirection:"row",
  }
});
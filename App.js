import React from 'react';
import { StyleSheet, Text, View, StatusBar,TouchableWithoutFeedback, Keyboard } from 'react-native';

import Header from './screens/Header';
import KeywordTab from './screens/KeywordTab';
import Footer from './screens/Footer';
import NewFeeds from './screens/NewFeeds';

export default function App() {

  return (
    <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
      <View style={styles.container}>
      <StatusBar style="auto"/>
        <Header/>
        <KeywordTab/>
        <NewFeeds/>
        <Footer/>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
     flex: 1,
  },
  keyTab:{
    flex: 1,
     flexDirection:"row",
  }
});

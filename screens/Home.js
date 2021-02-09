import React,{useState, useContext} from 'react';
import { StyleSheet, View, StatusBar,TouchableWithoutFeedback, Keyboard } from 'react-native';

import Header from './common/Header';
import KeywordTab from './home/KeywordTab';
import Footer from './common/Footer';
import Login from './common/Login'
import NewFeeds from './home/NewFeeds';


export default function Home({ navigation }) {
 
  const[activeKey, setActiveKey]= useState('All');
  const activeKeyHandler = (key)=>{
    setActiveKey(key);
  }

  return (
      <View style={styles.container}>
        <StatusBar style="auto"/>
        <Header navigation={navigation}/>
        <KeywordTab activeKeyHandler={activeKeyHandler} />
        <NewFeeds itemType={{type:'product'}} activeKey={activeKey} navigation={navigation}/>
        <Footer navigation = {navigation}/>
        {/* <Login navigation={navigation}/> */}
      </View>
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
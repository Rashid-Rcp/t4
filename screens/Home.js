import React,{useState, useContext} from 'react';
import { StyleSheet, View, StatusBar,TouchableWithoutFeedback, Keyboard } from 'react-native';

import Header from './common/Header';
import KeywordTab from './home/KeywordTab';
import Footer from './common/Footer';
import Login from './common/Login'
import NewFeeds from './home/NewFeeds';
import {KeywordProvider} from './home/KeywordContext';

export default function Home({ navigation }) {
  //const [keywordFilter, setKeywordFilter] = useState('All');

  
  const [refreshKeywords, setRefreshKeyword] = useState(1);
  const[activeKey, setActiveKey]= useState('All');

  const activeKeyHandler = (key)=>{
    setActiveKey(key);
  }
  
  
  // const [newKeyword, setNewKeyword] = useState('');
  const refreshKeywordsHandler = (item)=>{
    setRefreshKeyword(refreshKeywords+item);
    //console.log(item);
  }

  //const [keywordProductType, setKeywordProductType] = useState([]);
  //console.log(keywordProductType);

  // const keywordProductTypeHandler = (item)=>{
    
  //   let productType = keywordProductType;
  //   if(productType.length<10 && productType.indexOf(item) === -1){
  //     //console.log(item);
  //     productType.push(item);
  //     //console.log(productType);
  //     setKeywordProductType(productType); 
  //     console.log('home');
  //   }
   
  // }

  return (
    // <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
    <KeywordProvider>
      <View style={styles.container}>
        <StatusBar style="auto"/>
        <Header navigation={navigation}/>
        <KeywordTab activeKeyHandler={activeKeyHandler} />
        <NewFeeds itemType={{type:'product'}} activeKey={activeKey} refreshKeywordsHandler={refreshKeywordsHandler}/>
        <Footer navigation = {navigation}/>
        {/* <Login navigation={navigation}/> */}
      </View>
    </KeywordProvider>
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
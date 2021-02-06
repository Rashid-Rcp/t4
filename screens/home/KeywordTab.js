import React, { useState,useEffect, useContext } from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import axios from 'axios';

import { KeywordContext } from './KeywordContext';
import {UserContext} from '../common/UserContext';

function KeywordTab({activeKeyHandler}) {

    const [activeKey, setActiveKey] = useState('All');
    const [user, setUser] = useContext(UserContext);
    const[keywords, setKeywords] = useContext(KeywordContext);

    useEffect(() => {
       if(user.id !== '0'){
           axios.get(global.APILink+'/recent_product_types/'+user.id)
           .then(res=>{
               let newKeywords = [...keywords,...JSON.parse(res.data)];
               setKeywords(Array.from(new Set(newKeywords)));
           })
           .catch(err=>console.log(err));
       }
    }, [user])

    //fetch recent product type from users
    // if its less than 10 add from product types 

    return (
        <View style={styles.tab}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {
                keywords.map((item, index)=>{
                    return(
                        <Text key={index} style={[styles.keywords,activeKey===item?styles.active:'']} onPress={() => {setActiveKey(item);activeKeyHandler(item)}} >{item}</Text>
                    )
                })
                }
            </ScrollView>
        </View>
    )
}

export default KeywordTab;

const styles = StyleSheet.create({
   tab:{
       flexDirection:'row',
       borderColor:'#dfe1e5',
       borderWidth:1,
       marginVertical:5,
       paddingVertical:3,
   },
   keywords:{
       marginHorizontal:3,
       marginVertical:1,
       paddingHorizontal:10,
       paddingVertical:5,
       backgroundColor:'#f7f7f7',
       borderColor:'#dfe1e5',
       borderWidth:1,
       height:30,
       borderRadius:100,
       color:'#383838'
   },
   active:{
    backgroundColor:'#0a2351',
    color:'#fff',
   }
   
  });

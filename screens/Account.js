import React,{useState,useContext, useRef, useEffect} from 'react';
import { View, Text, StyleSheet,TouchableOpacity,ScrollView } from 'react-native';

import Profile from './account/Profile';
import Tabs from './account/Tabs';
import Footer from './common/Footer';
import Products from './account/tabs/Products';
import TabsContent from './account/TabsContent';

import AddNewPost from './account/tabs/AddNewPost'

import {ActiveTabProvider, ActiveTabContext} from './account/tabs/ActiveTabContext'
 

function Account() {
    
    const scrollRef = useRef();
   
    return (
        <ActiveTabProvider>
            <View style={styles.container}>
                 <ScrollView ref={scrollRef} stickyHeaderIndices={[1]}  showsVerticalScrollIndicator={false}>
                    <Profile/>
                    <Tabs scrollRef={scrollRef}/>
                    <TabsContent/>
                </ScrollView>
                
                <AddNewPost/>
                <Footer/>
            </View>
        </ActiveTabProvider>
       
    )
}

export default Account

const styles = StyleSheet.create({
 container:{
        paddingTop:10,
        backgroundColor:'#fff',
        flex:1,
 },
});

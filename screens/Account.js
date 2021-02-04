import React,{useState,useContext, useRef, useEffect, useCallback} from 'react';
import { View, Text, StyleSheet,TouchableOpacity,ScrollView, RefreshControl } from 'react-native';

import Profile from './account/Profile';
import Tabs from './account/Tabs';
import Footer from './common/Footer';
import Products from './account/tabs/Products';
import TabsContent from './account/TabsContent';

import AddNewPost from './account/tabs/AddNewPost'

import {ActiveTabProvider, ActiveTabContext} from './account/tabs/ActiveTabContext'
 

function Account({navigation}) {
    
    const scrollRef = useRef();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
      }, [refreshing]);
    
    const endRefresh =()=>{
        setRefreshing(false);
    }
    
    return (
        <ActiveTabProvider>
            <View style={styles.container}>
                <ScrollView ref={scrollRef} stickyHeaderIndices={[1]}  showsVerticalScrollIndicator={false}
                 refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                  }>
                    <Profile navigation={navigation} refreshing={refreshing} endRefresh={endRefresh} />
                    <Tabs scrollRef={scrollRef}/>
                    <TabsContent navigation={navigation} refreshing={refreshing}/>
                </ScrollView>
                
                <AddNewPost navigation={navigation}/>
                <Footer navigation={navigation}/>
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

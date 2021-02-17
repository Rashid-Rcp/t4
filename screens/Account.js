import React,{useState,useContext, useRef, useEffect, useCallback} from 'react';
import { View, StyleSheet,ScrollView, RefreshControl } from 'react-native';

import Login from './common/Login'
import Profile from './account/Profile';
import PublicProfile from './account/PublicProfile';
import Tabs from './account/Tabs';
import Footer from './common/Footer';
import TabsContent from './account/TabsContent';
import AddNewPost from './account/tabs/AddNewPost'

import {ActiveTabProvider} from './account/tabs/ActiveTabContext'
import {UserContext} from './common/UserContext';

function Account({navigation,route}) {
    
    const [user, setUser] = useContext(UserContext);
    const {accountId} = route.params;
    const scrollRef = useRef();
    const [refreshing, setRefreshing] = useState(true);
    const [selfAccount, setSelfAccount] = useState(false);
    const [scrollEnd, setScrollEnd] = useState(false);
    const [fetchItem, setFetchItem] = useState(true);
    
    useEffect(()=>{
        if(route.params.forceRefresh){
            setFetchItem(true);
        }
    },[route])

    useEffect(()=>{
        if(accountId.toString() === user.id){
            setSelfAccount(true);
        }
    },[accountId,user])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setScrollEnd(false);
        setFetchItem(true);
      }, [refreshing]);
    
    const endRefresh =()=>{
        setRefreshing(false);
    }

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize })=>{
        if(layoutMeasurement.height + contentOffset.y  >= contentSize.height - 100){
            setScrollEnd(true);
       }
    }

    const resetScrollEnd = ()=>{
        setScrollEnd(false);
    }
    if(user.id === '0'){
        return (
        <Login navigation={navigation} />
        )
    }
    else{
        return (
            <ActiveTabProvider>
                <View style={styles.container}>
                    <ScrollView ref={scrollRef} stickyHeaderIndices={[1]}  showsVerticalScrollIndicator={false}
                     refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                      }
                      onScroll={({ nativeEvent }) => { isCloseToBottom(nativeEvent)} }
                      >
                        {
                            selfAccount && <Profile navigation={navigation} refreshing={refreshing} endRefresh={endRefresh} accountId={accountId}/>
                        }
                        {
                            !selfAccount && <PublicProfile navigation={navigation} refreshing={refreshing} endRefresh={endRefresh} accountId={accountId}/>
                        }
                        
                        <Tabs scrollRef={scrollRef} setFetchItem={setFetchItem}/>
                        <TabsContent navigation={navigation} fetchItem={fetchItem} setFetchItem={setFetchItem} scrollEnd={scrollEnd} 
                            selfAccount={selfAccount} resetScrollEnd={resetScrollEnd} accountId={accountId}/>
                    </ScrollView>
                    {
                        selfAccount && <AddNewPost navigation={navigation}/>
                    }
                    <Footer navigation={navigation}/>
                </View>
            </ActiveTabProvider>
           
        )
    }
}

export default Account

const styles = StyleSheet.create({
 container:{
        paddingTop:10,
        backgroundColor:'#fff',
        flex:1,
 },
});

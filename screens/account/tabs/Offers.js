import React,{useState,useEffect, useContext} from 'react'
import { View, Text, StyleSheet, ActivityIndicator} from 'react-native'

import { AntDesign } from '@expo/vector-icons'; 
import axios from 'axios';

import ProductsImages from './ProductsImages';
import {UserContext} from '../../common/UserContext';
import ComponentLoader from '../../common/ComponentLoader';

function Offers({navigation, fetchItem, setFetchItem, scrollEnd, selfAccount, resetScrollEnd, accountId}) {
    const [user, setUser] = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [offers, setOffers] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
   
    useEffect(()=>{
        if(fetchItem){
            setIsLoading(true);
            axios.get(global.APILink+'/offers/user/'+accountId)
            .then(res=>{
            // console.log(res.data);
                res.data.data && setOffers(res.data.data);
                res.data.next_page_url && setNextPage(res.data.next_page_url);
                res.data && setIsLoading(false);
                res.data && setFetchItem(false);
                res.data && resetScrollEnd();
            })
            .catch(err=>console.log(err));
        }
    },[fetchItem])

    useEffect(()=>{
        if(scrollEnd && nextPage !== null){
            setIsLoadingMore(true);
            axios.get(nextPage)
            .then(res=>{
                res.data && setOffers([...offers,...res.data.data]);
                res.data && setNextPage(res.data.next_page_url);
                res.data && setIsLoadingMore(false);
                res.data && resetScrollEnd();
            })
            .catch(err=>console.log(err))
        }
    },[scrollEnd])

    if(isLoading){
        return (
            <ComponentLoader height={150} />
        )
    }
    else {
        return (
            <>
            <View style={styles.container}>
            {
                offers.map((item,index)=>{
                  return  (
                    <View key={index} style={styles.productHolder}>
                        <ProductsImages navigation={navigation} productID={item.id} images ={item.images} type='offers' selfAccount={selfAccount} />
                        <Text style={styles.productName}>{item.title}</Text>
                        <View style={styles.productStatus}>
                            <AntDesign name="checkcircle" size={15} color={item.status==='active'?"#0a2351":'#ccc'}/>
                        </View>
                    </View>
                    )
                })
             }
             {
                offers.length === 0 && <Text style={styles.noData}>
                    No data found.
                </Text>
             }
            </View>
            {
            isLoadingMore && <View style={{height:50}}>
                  <ActivityIndicator size="small" color="#0a2351"  />
                </View>
            }
            </>
        )
    }
}

export default Offers;

const styles=StyleSheet.create({

    container:{
        flex:1,
        paddingHorizontal:5,
        flexDirection:'row',
        flexWrap:'wrap',
    },
    productHolder:{
       alignItems:'center',
       marginTop:10,
       marginBottom:20,
       marginHorizontal:2,
        borderColor:'#dfe1e5',
        borderWidth:.5,
        paddingBottom:10,
        width:'48%',
    },
    productName:{
        textAlign:'center',
    },
    productPrice:{
        fontSize:17,
    },
    productStatus:{
        position:'absolute',
        bottom:10,
        right:10,
    },
    noData:{
        textAlign:'center',
        marginTop:30,
        width:'100%',
    }
});
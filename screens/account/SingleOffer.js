import React,{useEffect, useState,useContext, useCallback} from 'react'
import { View,Text,Image, Button, ScrollView, StyleSheet, Dimensions, RefreshControl } from 'react-native'

import axios from 'axios';

import {UserContext} from '../common/UserContext';
import ProductMedia from '../products/ProductMedia'
import ProductDetails from '../products/ProductDetails'
import ProductFooter from '../products/ProductFooter'
import Footer from '../common/Footer';
import ComponentLoader from '../common/ComponentLoader';

function SingleOffer({route, navigation}) {

    const [user,setUser]=useContext(UserContext);
    const {offerId} =  route.params;
    const [offerDetails, setOfferDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const width = Dimensions.get('window').width;
    const widthPercentage =((1080-width)/1080) *100;
    const height = (1350/100) * (100-widthPercentage);
    const mediaDimension = {
        width:width,
        height:height,
      }
      const enable_disable_offer = ()=>{

      }

      const deleteOffer = ()=>{

      }
      const getData = ()=>{
        axios.get(global.APILink+'/offers/'+offerId+'/'+user.id)
        .then(res=>{
            //console.log(res.data);
            res.data && setOfferDetails(res.data);
            //console.log(res.data);
            res.data && setIsLoading(false);
            res.data && setRefreshing(false);
        })
        .catch(err=>console.log(err));
      }

      useEffect(()=>{
        getData();
      },[]);

      const onRefresh = useCallback(()=>{
        setRefreshing(true);
        getData();
      },[refreshing])

        return (
            <View style={styles.container}>
                {
                isLoading && <ComponentLoader height={100} />
                }
                {
                !isLoading && <ScrollView 
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>
                    <View style={styles.holder}>
                        <ProductMedia images={offerDetails.images} mediaDimension={mediaDimension} type="offers"/>
                        <ProductDetails productDetails={offerDetails} itemType={{type:'offer'}}/>
                        <ProductFooter productDetails={offerDetails} navigation={navigation} type='offers'/>
                        <View style={{flex:1,alignItems:'center'}}>
                            <View style={{width:'70%'}}>
                                    <Button 
                                    title="Disable"
                                    color="#282828"
                                    onPress={enable_disable_offer}
                                />
                            </View>
                        </View>
                        <View style={{flex:1,marginTop:15,marginBottom:50,alignItems:'center'}}>
                            <View style={{width:'70%'}}>
                                <Button 
                                title="Delete"
                                color="#282828"
                                onPress={deleteOffer}
                                />
                            </View>
                        
                        </View>
                    </View>
                </ScrollView>
                }
                <Footer navigation={navigation}/>
            </View>
        )
}

export default SingleOffer

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fafafa',
    },
    holder:{
        flex:1,
    }
});

import React,{useEffect, useState,useContext, useCallback} from 'react'
import { View,Text,Image, Button, ScrollView, StyleSheet, Dimensions, RefreshControl } from 'react-native'

import axios from 'axios';

import {UserContext} from '../common/UserContext';
import ProductMedia from '../products/ProductMedia'
import ProductDetails from '../products/ProductDetails'
import ProductFooter from '../products/ProductFooter'
import Footer from '../common/Footer';
import ComponentLoader from '../common/ComponentLoader';

function SingleProduct({route, navigation}) {

    const [user,setUser]=useContext(UserContext);
    const {productId} =  route.params;
    const [productDetails, setProductDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const width = Dimensions.get('window').width;
    const widthPercentage =((1080-width)/1080) *100;
    const height = (1350/100) * (100-widthPercentage);
    const mediaDimension = {
        width:width,
        height:height,
      }
      const enable_disable_product = ()=>{

      }

      const deleteProduct = ()=>{

      }
      const getData = ()=>{
        axios.get(global.APILink+'/products/'+productId+'/'+user.id)
        .then(res=>{
            //console.log(res.data);
            res.data && setProductDetails(res.data);
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

      if(isLoading){
          return (
              <ComponentLoader height={100} />
          )
      }
      else {
        return (
            <View style={styles.container}>
                <ScrollView 
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                  }>
                    <View style={styles.holder}>
                        <ProductMedia images={productDetails.images} mediaDimension={mediaDimension}/>
                        <ProductDetails productDetails={productDetails} itemType={{type:'product'}}/>
                        <ProductFooter productDetails={productDetails} navigation={navigation} />
                        <View style={{flex:1,alignItems:'center'}}>
                            <View style={{width:'70%'}}>
                                    <Button 
                                    title="Disable"
                                    color="#282828"
                                    onPress={enable_disable_product}
                                />
                            </View>
                        </View>
                        
                        <View style={{flex:1,marginTop:15,marginBottom:50,alignItems:'center'}}>
                            <View style={{width:'70%'}}>
                                <Button 
                                title="Delete"
                                color="#282828"
                                onPress={deleteProduct}
                                />
                            </View>
                        
                        </View>
                    </View>
                </ScrollView>
                <Footer navigation={navigation}/>
            </View>
        )
      }
}

export default SingleProduct

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fafafa',
    },
    holder:{
        flex:1,
    }
});

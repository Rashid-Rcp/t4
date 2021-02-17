import React,{useEffect, useState,useContext, useCallback} from 'react'
import { View,Text,Image, Button, ScrollView, StyleSheet, Dimensions, RefreshControl, Alert } from 'react-native'

import axios from 'axios';
import { showMessage, hideMessage } from "react-native-flash-message";

import {UserContext} from '../common/UserContext';
import ProductMedia from '../products/ProductMedia'
import ProductDetails from '../products/ProductDetails'
import ProductFooter from '../products/ProductFooter'
import Footer from '../common/Footer';
import ComponentLoader from '../common/ComponentLoader';

function SingleProduct({route, navigation}) {

    const [user,setUser]=useContext(UserContext);
    const {productId} =  route.params;
    const {selfAccount} = route.params;
    const [productDetails, setProductDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [status, setStatus] = useState('');
    const [isChangingStatus, setIsChangingStatus] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [itemFound, setItemFound] = useState(true);

    const width = Dimensions.get('window').width;
    const widthPercentage =((1080-width)/1080) *100;
    const height = (1350/100) * (100-widthPercentage);
    const mediaDimension = {
        width:width,
        height:height,
      }
      const enable_disable_product = ()=>{
          if(user.id !== '0'){
            setIsChangingStatus(true);
            let statusTo = status==='active'?'deactivate':'active';
            axios.post(global.APILink+'/product_status_change',{productId:productId,userId:user.id,statusTo:statusTo})
            .then(res=>{
                setIsChangingStatus(false);
                res.data.status === 'success' && setStatus(statusTo);
                res.data.status === 'success' && showFlashMessage('success','products status changed.');
                res.data.status !== 'success' && showFlashMessage('danger','An error occurred please try again later');
            })
          }
      }

      const showFlashMessage = (type, message) => {
        showMessage({
            title: "Add new product",
            message: message,
            type: type
        })
    }

    const confirmDeletion =()=>{
        Alert.alert(
            "Delete Product",
            "Are your sure to delete this product?",
            [
              {
                text: "Cancel",
                onPress: () => false,
                style: "cancel"
              },
              { text: "YES", onPress: () => deleteProduct() }
            ],
            { cancelable: false }
        );
    }
      const deleteProduct = ()=>{
          if(user.id !== '0'){
              setIsDeleting(true);
              axios.delete(global.APILink+'/product_delete/'+productId+'/'+user.id)
              .then(res=>{
                res.data.status === 'success' && navigation.navigate('Account',{accountId:user.id, forceRefresh:true});
                res.data.status !== 'success' && showFlashMessage('danger','An error occurred please try again later');
                res.data.status !== 'success' && setIsDeleting(false);
              })
              .catch(err=>console.log(err))
          }
      }

      const getData = ()=>{
        axios.get(global.APILink+'/products/'+productId+'/'+user.id)
        .then(res=>{
            console.log(res.data.status);
            if(res.data.status === 'not_found'){
                setItemFound(false);
                setIsLoading(false);
                setRefreshing(false);
            }
            else{
                res.data && setProductDetails(res.data);
                res.data && setStatus(res.data.status);
                res.data && setIsLoading(false);
                res.data && setRefreshing(false);
            }
            
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
                {
                itemFound && <ScrollView 
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>
                    <View style={styles.holder}>
                        <ProductMedia images={productDetails.images} mediaDimension={mediaDimension}/>
                        <ProductDetails productDetails={productDetails} itemType={{type:'product'}}/>
                        <ProductFooter productDetails={productDetails} navigation={navigation} />
                        {
                        selfAccount &&  <View style={{flex:1,alignItems:'center'}}>
                            <View style={{width:'70%'}}>
                                    <Button 
                                    disabled={isChangingStatus}
                                    title={status === 'active'? "Disable":"Enable"}
                                    color="#282828"
                                    onPress={enable_disable_product}
                                />
                            </View>
                        </View>
                        }
                        {
                        selfAccount &&  <View style={{flex:1,marginTop:15,marginBottom:50,alignItems:'center'}}>
                            <View style={{width:'70%'}}>
                                <Button 
                                title="Delete"
                                color="#282828"
                                disabled={isDeleting}
                                onPress={confirmDeletion}
                                />
                            </View>
                        </View>
                        }
                    </View>
                </ScrollView>
                }
                {
                    !itemFound && <View style={{flex:1}}> 
                    <Text style={styles.notFound}>Not Found</Text>
                    </View>
                }
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
    },
    notFound:{
        paddingVertical:50,
        paddingHorizontal:10,
        textAlign:'center',
        fontSize:17,
    }
});

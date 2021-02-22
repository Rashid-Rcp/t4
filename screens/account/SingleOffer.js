import React,{useEffect, useState,useContext, useCallback} from 'react'
import { View,Text,Button, ScrollView, StyleSheet, Dimensions, RefreshControl,Alert } from 'react-native'

import axios from 'axios';
import { showMessage} from "react-native-flash-message";


import {UserContext} from '../common/UserContext';
import ProductHeader from '../products/ProductHeader'
import ProductMedia from '../products/ProductMedia'
import ProductDetails from '../products/ProductDetails'
import ProductFooter from '../products/ProductFooter'
import Footer from '../common/Footer';
import ComponentLoader from '../common/ComponentLoader';

function SingleOffer({route, navigation}) {

    const [user,setUser]=useContext(UserContext);
    const {offerId} =  route.params;
    const {selfAccount} = route.params;
    const [offerDetails, setOfferDetails] = useState({});
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

      const enable_disable_offer = ()=>{
        if(user.id !== '0'){
          setIsChangingStatus(true);
          let statusTo = status==='active'?'deactivate':'active';
          axios.post(global.APILink+'/offer_status_change',{offerId:offerId,userId:user.id,statusTo:statusTo})
          .then(res=>{
              setIsChangingStatus(false);
              res.data.status === 'success' && setStatus(statusTo);
              res.data.status === 'success' && showFlashMessage('success','offer status changed.');
              res.data.status !== 'success' && showFlashMessage('danger','An error occurred please try again later');
          })
        }
    }

    const showFlashMessage = (type, message) => {
      showMessage({
          title: "Add new offer",
          message: message,
          type: type
      })
  }

  const confirmDeletion =()=>{
      Alert.alert(
          "Delete offer",
          "Are your sure to delete this offer?",
          [
            {
              text: "Cancel",
              onPress: () => false,
              style: "cancel"
            },
            { text: "YES", onPress: () => deleteOffer() }
          ],
          { cancelable: false }
      );
  }
    const deleteOffer = ()=>{
        if(user.id !== '0'){
            setIsDeleting(true);
            axios.delete(global.APILink+'/offer_delete/'+offerId+'/'+user.id)
            .then(res=>{
              res.data.status === 'success' && navigation.navigate('Account',{accountId:user.id, forceRefresh:true});
              res.data.status !== 'success' && showFlashMessage('danger','An error occurred please try again later');
              res.data.status !== 'success' && setIsDeleting(false);
            })
            .catch(err=>console.log(err))
        }
    }

      const getData = ()=>{
        axios.get(global.APILink+'/offers/'+offerId+'/'+user.id)
        .then(res=>{
           
            if(res.data.status === 'not_found'){
                setItemFound(false);
                res.data && setIsLoading(false);
                res.data && setRefreshing(false);
            }
            else{
                res.data && setOfferDetails(res.data);
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

        return (
            <View style={styles.container}>
                {
                isLoading && <ComponentLoader height={100} />
                }
                {
                (!isLoading && itemFound) && <ScrollView 
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>
                    <View style={styles.holder}>
                        <ProductHeader shopDetails={offerDetails} navigation={navigation} type='offers'/>
                        <ProductMedia images={offerDetails.images} mediaDimension={mediaDimension} type="offers"/>
                        <ProductDetails productDetails={offerDetails} itemType={{type:'offers'}}/>
                        <ProductFooter productDetails={offerDetails} navigation={navigation} type='offers'/>
                        {
                            selfAccount && <View style={{flex:1,alignItems:'center'}}>
                            <View style={{width:'70%'}}>
                                    <Button 
                                    disabled={isChangingStatus}
                                    title={status === 'active'? "Disable":"Enable"}
                                    color="#282828"
                                    onPress={enable_disable_offer}
                                />
                            </View>
                        </View>
                        }
                        {
                            selfAccount && <View style={{flex:1,marginTop:15,marginBottom:50,alignItems:'center'}}>
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

export default SingleOffer

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fafafa',
    },
    holder:{
        flex:1,
        backgroundColor:'#fff'
    },
    notFound:{
        paddingVertical:50,
        paddingHorizontal:10,
        textAlign:'center',
        fontSize:17,
    }
});

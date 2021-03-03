import React,{useContext, useState, useEffect} from 'react'
import { View, Text, StyleSheet,TouchableWithoutFeedback,Share, Linking } from 'react-native'
import { MaterialCommunityIcons, FontAwesome, Ionicons , MaterialIcons} from '@expo/vector-icons';
import axios from 'axios';

import {UserContext} from '../common/UserContext';
import Login from '../common/Login';
import abbreviateNumber from '../common/abbreviateNumber';

function ProductFooter({productDetails, navigation, type='products', isHolding=false, removeItemFromHoldings=false}) {

    const [user, setUser] = useContext(UserContext);
    const onHold = isHolding || false;
    const [isLiked, setIsLiked] = useState(productDetails.isLiked === null?0:productDetails.isLiked);
    const [likes, setLikes] = useState(productDetails.likes === null?0:productDetails.likes);
    const [holdingsAddedAlert, setHoldingsAddedAlert] = useState('');
    const [showLogin, setShowLogin] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    useEffect(()=>{
        user.id !== '0' && setIsLogin(true);
    },[user])
   
    useEffect(() => {
        setIsLiked(productDetails.isLiked === null?0:productDetails.isLiked);
        setLikes(productDetails.likes === null?0:productDetails.likes);
    }, [productDetails])

    const handleProductLike =()=>{
        if(isLogin){
            setIsLiked(1);
            setLikes(likes+1);
            axios.post(global.APILink+'/'+type+'/like',{productId:productDetails.id, productType:productDetails.type, userId:user.id, action:'like'})
            .then(res=>{
                res.data.status !== 'success' && setIsLiked(0);
                res.data.status !== 'success' &&  setLikes(likes);
            })
            .catch(err=>console.log(err));
        }
        else{
            setShowLogin(true);
        }
    }

    const handleProductDislike = ()=>{
        if(isLogin){
            setIsLiked(0);
            setLikes(likes-1);
            axios.post(global.APILink+'/'+type+'/like',{productId:productDetails.id, productType:productDetails.type, userId:user.id, action:'dislike'})
            .then(res=>{
                res.data.status !== 'success' && setIsLiked(1);
                res.data.status !== 'success' && setLikes(likes);
            })
            .catch(err=>console.log(err));
        }
        else{
            setShowLogin(true)
        }
    }

    const handleAddToHoldings=()=>{
        if(isLogin){
            setHoldingsAddedAlert('Added to holdings');
            setTimeout(() => {
                setHoldingsAddedAlert('');
              }, 2000);
              axios.post(global.APILink+'/'+type+'_holdings',{userId:user.id, productId:productDetails.id, productType:productDetails.type})
              .then(res=>{
                  res.data.status !=='success' && setHoldingsAddedAlert('An error occurred');
                  res.data.status !== 'success' && setTimeout(() => {setHoldingsAddedAlert('')}, 2000);
              })
              .catch(err=>console.log(err))
        }
        else{
            setShowLogin(true);
        }
    }

    const handleRemoveFromHoldings = (id, holdingType)=>{
        if(isLogin){
            axios.post(global.APILink+'/holdings_remove',{holdingType:holdingType,id:id,userId:user.id})
            .then(res=>{
                //console.log(res.data)
            })
            .catch(err=>console.log(err));
            removeItemFromHoldings(id, holdingType);
        }
        else{
            setShowLogin(true);
        }
       
    }
 const handleWhatsApp = ()=>{
    Linking.openURL('https://wa.me/?text='+global.shareLink+'/'+type+'/'+productDetails.id);
 }

 const onShare = async () => {
    try {
      const result = await Share.share({
        message:global.shareLink+'/'+type+'/'+productDetails.id ,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
    

    return (
        <View style={styles.footer}>
            <View style={styles.items}>
                
                {
                   isLiked !== 0  && <TouchableWithoutFeedback onPress={handleProductDislike}>
                    <MaterialCommunityIcons name="heart" size={30} color="#ff0038" />
                    </TouchableWithoutFeedback>
                }
                {
                   isLiked === 0  && <TouchableWithoutFeedback onPress={handleProductLike}>
                    <MaterialCommunityIcons name="heart-outline" size={30} color="#282828" />
                    </TouchableWithoutFeedback>
                    
                }
                <Text style={styles.count}>{likes>0?abbreviateNumber(likes):''}</Text>
            </View>
            <View style={styles.items}>
                <TouchableWithoutFeedback onPress={()=>isLogin?navigation.navigate('Comments',{productId:productDetails.id,productType: type}):setShowLogin(true)}>
                    <FontAwesome name="comment-o" size={30} color="#282828" />
                </TouchableWithoutFeedback>
                    <Text style={styles.count}>{productDetails.comments>0?abbreviateNumber(productDetails.comments):''}</Text>
               
            </View>
            <View style={styles.items}>
                {!onHold && <TouchableWithoutFeedback onPress={handleAddToHoldings}> 
                    <FontAwesome name="hand-grab-o" size={30} color="#282828" />
                    </TouchableWithoutFeedback>
                }
                {
                    holdingsAddedAlert !== '' &&  
                    <Text style={styles.holdingsAlert}>{holdingsAddedAlert}</Text>
                }

                {onHold && <TouchableWithoutFeedback onPress={()=>handleRemoveFromHoldings(productDetails.id,productDetails.holding_type)}>
                    <MaterialIcons name="highlight-remove" size={30} color="#282828" 
                    style={{borderRadius:100,}} />
                    </TouchableWithoutFeedback>
                    
                    }
            </View>
            <View style={styles.items}>
                <TouchableWithoutFeedback onPress={handleWhatsApp}>
                    <MaterialCommunityIcons name="whatsapp" size={30} color="#282828" />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={onShare}>
                    <Ionicons style={styles.share} name="share-social-outline" size={30} color="#282828" />
                </TouchableWithoutFeedback>
            </View>
            {
            showLogin && <Login navigation={navigation} setShowLogin={setShowLogin} />
            }
        </View>
    )
}

export default ProductFooter;

const styles = StyleSheet.create({
    footer:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingTop:5,
        paddingBottom:10,
        paddingHorizontal:10,
        marginBottom:30,
        borderBottomWidth:.5,
        borderBottomColor:'#e9ebed',
    },
    items:{
        flexDirection:'row',
        alignItems:'center',
    },
    share:{
        marginLeft:5,
    },
    count:{
        paddingLeft:3,
    },
    holdingsAlert:{
        position:'absolute',
        top:-40,
        backgroundColor:'#fff',
        padding:5,
        borderRadius:5,
        left:-30,
        borderWidth:.5,
        borderColor:"#282828",
        zIndex:10,
    }

});

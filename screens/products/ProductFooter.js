import React,{useContext, useState, useEffect} from 'react'
import { View, Text, StyleSheet,TouchableWithoutFeedback, } from 'react-native'
import { MaterialCommunityIcons, FontAwesome, Ionicons , MaterialIcons} from '@expo/vector-icons';
import axios from 'axios';

import {UserContext} from '../common/UserContext';

function ProductFooter({productDetails, navigation, type='products', isHolding=false, removeItemFromHoldings=false}) {

    const [user, setUser] = useContext(UserContext);
    const onHold = isHolding || false;
    const [isLiked, setIsLiked] = useState(productDetails.isLiked === null?0:productDetails.isLiked);
    const [likes, setLikes] = useState(productDetails.likes === null?0:productDetails.likes);
    const [holdingsAddedAlert, setHoldingsAddedAlert] = useState('');
   
    useEffect(() => {
        setIsLiked(productDetails.isLiked === null?0:productDetails.isLiked);
        setLikes(productDetails.likes === null?0:productDetails.likes);
    }, [productDetails])

    const handleProductLike =()=>{
        setIsLiked(1);
        setLikes(likes+1);
        axios.post(global.APILink+'/'+type+'/like',{productId:productDetails.id, productType:productDetails.type, userId:user.id, action:'like'})
        .then(res=>{
            res.data.status !== 'success' && setIsLiked(0);;
            res.data.status !== 'success' &&  setLikes(likes-1);
        })
        .catch(err=>console.log(err));
    }

    const handleProductDislike = ()=>{
        setIsLiked(0);
        setLikes(likes-1);
        axios.post(global.APILink+'/'+type+'/like',{productId:productDetails.id, productType:productDetails.type, userId:user.id, action:'dislike'})
        .then(res=>{
            res.data.status !== 'success' && setIsLiked(1);
            res.data.status !== 'success' && setLikes(likes+1);
        })
        .catch(err=>console.log(err));
    }

    const handleAddToHoldings=()=>{
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

    const handleRemoveFromHoldings = (id, holdingType)=>{
        axios.delete(global.APILink+'/holdings_remove/'+holdingType+'/'+id+'/'+user.id)
        .then(res=>{
            //console.log(res.data)
        })
        .catch(err=>console.log(err));
        removeItemFromHoldings(id, holdingType);
    }

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
                <Text style={styles.count}>{likes>0?likes:''}</Text>
            </View>
            <View style={styles.items}>
                <TouchableWithoutFeedback onPress={()=>navigation.navigate('Comments',{productId:productDetails.id,productType: type})}>
                    <FontAwesome name="comment-o" size={30} color="#282828" />
                </TouchableWithoutFeedback>
                    <Text style={styles.count}>{productDetails.comments>0?productDetails.comments:''}</Text>
               
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
                <MaterialCommunityIcons name="whatsapp" size={30} color="#282828" />
                <Ionicons style={styles.share} name="share-social-outline" size={30} color="#282828" />
            </View>
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

import React,{useContext, useState} from 'react'
import { View, Text, StyleSheet,TouchableWithoutFeedback, } from 'react-native'

import { MaterialCommunityIcons, FontAwesome, Ionicons , MaterialIcons} from '@expo/vector-icons';

import axios from 'axios';

import {UserContext} from '../common/UserContext';
import { TouchableOpacity } from 'react-native-gesture-handler';

function ProductFooter({holdings, productDetails, navigation}) {

    const [user, setUser] = useContext(UserContext);
    const onHold = holdings || false;
    const [isLiked, setIsLiked] = useState(productDetails.isLiked);
    const [likes, setLikes] = useState(productDetails.likes);

    const handleProductLike =()=>{
        setIsLiked(1);
        setLikes(likes+1);
        axios.post(global.APILink+'/products/like',{productId:productDetails.id, userId:user.id, action:'like'})
        .then(res=>{
            res.data.status !== 'success' && setIsLiked(0);
            res.data.status !== 'success' && setLikes(likes-1);
        })
        .catch(err=>console.log(err));
    }

    const handleProductDislike = ()=>{
        setIsLiked(0);
        setLikes(likes-1);
        axios.post(global.APILink+'/products/like',{productId:productDetails.id, userId:user.id, action:'dislike'})
        .then(res=>{
            res.data.status !== 'success' && setIsLiked(1);
            res.data.status !== 'success' && setLikes(likes+1);
        })
        .catch(err=>console.log(err));
    }

    return (
        <View style={styles.footer}>
            <View style={styles.items}>
                {
                    isLiked !== 0 && <TouchableWithoutFeedback onPress={handleProductDislike}>
                    <MaterialCommunityIcons name="heart" size={30} color="#ff0038" />
                    </TouchableWithoutFeedback>
                }
                {
                    isLiked === 0 && <TouchableWithoutFeedback onPress={handleProductLike}>
                    <MaterialCommunityIcons name="heart-outline" size={30} color="#282828" />
                    </TouchableWithoutFeedback>
                    
                }
                <Text style={styles.count}>{likes>0?likes:''}</Text>
            </View>
            <View style={styles.items}>
                <TouchableWithoutFeedback onPress={()=>navigation.navigate('Comments',{productId:productDetails.id,productType:'product'})}>
                    <FontAwesome name="comment-o" size={30} color="#282828" />
                </TouchableWithoutFeedback>
                    <Text style={styles.count}>{productDetails.comments>0?productDetails.comments:''}</Text>
               
            </View>
            <View style={styles.items}>
                {!onHold && <FontAwesome name="hand-grab-o" size={30} color="#282828" />}
                {onHold && <MaterialIcons name="highlight-remove" size={30} color="#282828" 
                    style={{borderRadius:100,}} />}
                
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
    }

});

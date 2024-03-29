import React from 'react'
import { View, Text,Image,StyleSheet, TouchableWithoutFeedback,Linking } from 'react-native'

import { Ionicons } from '@expo/vector-icons'; 

function ProductHeader({shopDetails, navigation, type='products'}) {

    const handleChat =()=>{
        Linking.openURL('https://wa.me/'+shopDetails.shopPhone+'?text='+global.shareLink+'/'+type+'/'+shopDetails.id);
    }
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={()=>{ navigation.navigate('Account',{accountId:shopDetails.shopId})}}>
                <View style={styles.left}>
                    <Image 
                        style={styles.DP}
                        source={{uri: global.serverPublic+'/images/'+shopDetails.shopImage}}/>
                    <View>
                            <Text style={styles.name}>{shopDetails.shopName}</Text>
                            <Text style={styles.location}>{shopDetails.shopLocation}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <View >
                {
                    shopDetails.shopPhone !== '' && shopDetails.shopPhone !== null && <TouchableWithoutFeedback onPress={handleChat}>
                    <Ionicons  name="ios-chatbubble-ellipses-outline" size={30} color="#282828" />
                </TouchableWithoutFeedback>
                }
            </View>
        </View>
    )
}

export default ProductHeader;

const styles= StyleSheet.create({
 container:{
     flex:1,
     flexDirection:'row',
     alignItems:'center',
     justifyContent:'space-between',
     borderBottomColor:'#dfe1e5',
     borderBottomWidth:.7, 
     paddingHorizontal:10,

 },
 DP:{
    resizeMode: 'contain',
    width:50,
    height:50,
    borderRadius:100000,
    marginVertical:3,
 },
 name:{
     fontWeight :'600',
     paddingLeft:10,
     fontSize:16,
 },
 location:{
     paddingLeft:10,
     fontWeight:'400',
     textTransform:'capitalize'
 },
 left:{
     flexDirection:'row',
     alignItems:'center',
 }
});

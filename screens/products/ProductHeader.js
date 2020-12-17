import React from 'react'
import { View, Text,Image,StyleSheet } from 'react-native'

import { Ionicons } from '@expo/vector-icons'; 

function ProductHeader() {
    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <Image 
                style={styles.DP}
                source={{uri: 'https://picsum.photos/200'}}/>
                <View>
                    <Text style={styles.name}>Shop Name</Text>
                    <Text style={styles.location}>Location</Text>
                </View>
            </View>
            <View>
                <Ionicons style={styles.chatIcon} name="ios-chatbubble-ellipses-outline" size={30} color="black" />
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

 },
 DP:{
    resizeMode: 'contain',
    width:55,
    height:55,
    borderRadius:100,
    margin:3,
 },
 name:{
     fontWeight :'600',
     paddingLeft:5,
     fontSize:17,
 },
 location:{
     paddingLeft:5,
     fontWeight:'400',
 },
 left:{
     flexDirection:'row',
     alignItems:'center',
 }
});

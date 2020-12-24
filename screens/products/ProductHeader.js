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
            <View >
                <Ionicons  name="ios-chatbubble-ellipses-outline" size={30} color="#282828" />
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
    borderRadius:100,
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
 },
 left:{
     flexDirection:'row',
     alignItems:'center',
 }
});

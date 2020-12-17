import React from 'react'
import { StyleSheet, Text, View,Image, TextInput } from 'react-native';
import { EvilIcons, Ionicons } from '@expo/vector-icons'; 


function Header() {
    return (
        <View style={styles.header}>
            <View style={styles.headerSec1}>
                <Image
                    style={styles.logo}
                    source={require('../assets/t4-logo.png')}
                />
                <EvilIcons style={styles.locationIcon} name="location" size={35} color="black" />
                <TextInput placeholder='Enter your city/town'/>
            </View>
            <View>
                <Ionicons style={styles.chatIcon} name="ios-chatbubble-ellipses-outline" size={20} color="black" />
                <EvilIcons style={styles.userIcon} name="user" size={40} color="black" />
            </View>
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
   logo:{width: 50, height:40, resizeMode: 'contain', },
   header:{
        // flex:1,
          alignItems: 'center',
          justifyContent : 'space-between',
         //justifyContent: 'center',
          flexDirection:"row",
        //  backgroundColor:'#fff',
        //  height:100,

   },
   headerSec1:{flexDirection:'row',alignItems:'center'},
   locationIcon:{marginLeft:20, },
   userIcon:{},
   chatIcon:{
        position:'absolute',
        top:0,left:-15,
        transform: [{ rotateY: "180deg" }],
        backgroundColor:'#fca9a9',
        borderRadius:100,
    }
  });

import React from 'react';
import { StyleSheet, View,Text } from 'react-native';
import { MaterialCommunityIcons,AntDesign,FontAwesome } from '@expo/vector-icons'; 
function Footer() {
    return (
        <View style={styles.footer}>
          <MaterialCommunityIcons name="store-outline" size={35} color="black" />
          <MaterialCommunityIcons name="lightning-bolt-outline" size={35} color="black" />
          <AntDesign name="search1" size={35} color="black" />
          <FontAwesome name="hand-grab-o" size={35} color="black" />
          <AntDesign name="gift" size={35} color="black" />
        </View>
    )
}

export default Footer

const styles = StyleSheet.create({
    footer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        height:50,
        backgroundColor:'#fff',
    }
});
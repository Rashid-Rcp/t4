import React from 'react';
import { StyleSheet, View,Text } from 'react-native';
import { MaterialCommunityIcons,AntDesign,FontAwesome } from '@expo/vector-icons'; 
function Footer() {
    return (
        <View style={styles.footer}>
          <MaterialCommunityIcons name="store-outline" size={35} color="#282828" />
          <MaterialCommunityIcons name="lightning-bolt-outline" size={35} color="#282828" />
          <AntDesign name="search1" size={35} color="#282828" />
          <FontAwesome name="hand-grab-o" size={35} color="#282828" />
          <AntDesign name="gift" size={35} color="#282828" />
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
        borderColor:'#dfe1e5',
        borderWidth:1,
    }
});
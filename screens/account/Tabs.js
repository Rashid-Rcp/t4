import React from 'react'
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native'

function Tabs() {
    const activeTab = 'products';
    return (
        <View style={styles.container}>
           <View style={[styles.tabButton,activeTab==='products'?styles.active:'']}>
               <Text>Products</Text>
           </View>
           <View style={[styles.tabButton,activeTab==='offers'?styles.active:'']}>
               <Text>Offers</Text>
           </View>
           <View style={[styles.tabButton,activeTab==='chats'?styles.active:'']}>
               <Text>Chats</Text>
           </View>
        </View>
    )
}

export default Tabs;

const styles=StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        marginTop:30,
        paddingHorizontal:5,
        borderBottomColor:'#dfe1e5',
        borderBottomWidth:1,
    },
    tabButton:{
        paddingVertical:10,
        borderWidth:1,
        borderColor:'#dfe1e5',
        flex:1,
        alignItems:'center',
        borderTopLeftRadius:25,
        borderTopRightRadius:15,
        marginHorizontal:3,
        backgroundColor:'#f8f8f8',
        marginBottom:-1,
        
    },
    active:{
        backgroundColor:'#fff',
        borderBottomColor:'#fff',
    }
});

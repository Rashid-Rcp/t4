import React from 'react'
import { View, Text, StyleSheet,Image,FlatList } from 'react-native'




function Chats() {
   
    const Content = () => (
        <View style={styles.chatHolder}>
            <View style={styles.productDetails}>
                <Image 
                    style={styles.productImage}
                    source={{uri: 'https://picsum.photos/170/250'}}/>
                <View>
                    <Text style={styles.productName}>ProductName</Text>
                    <Text style={styles.productPrice}>$50</Text>
                </View>
            </View>
            <View style={styles.userDetails}>
                <Image 
                    style={styles.profileDP}
                    source={{uri: 'https://picsum.photos/50'}}/>
                <View style={styles.messageDetails}>
                        <Text style={styles.userName}>User name</Text>
                        <Text style={styles.message}>do you have any other colour of this product</Text>
                </View>
            </View>
            <View style={styles.unreadMessagesCount}>
                    <Text style={styles.messageCount}>3</Text>
            </View>

        </View>
      );
    

    return (
        <View style={styles.container}>
           <Content/>
           <Content/>
           <Content/>
           <Content/>
           <Content/>
           <Content/>
        </View>
    )
}

export default Chats;


const styles=StyleSheet.create({

    container:{
        flex:1,
        paddingHorizontal:5,
    },
    chatHolder:{
    marginBottom:10,
    backgroundColor:'#f7f7f7',
    paddingHorizontal:5,
    paddingVertical:10,
    borderRadius:3,
    borderWidth:.5,
    borderColor:'#ccc',
    },
    productImage:{
        width:40,
        height:60,
        resizeMode:'contain',
    },
    productDetails:{
        flex:1,
        flexDirection:'row',
    },
    productName:{
        paddingLeft:10,
    },
    productPrice:{
        paddingLeft:10,
        paddingTop:5,
    },
    userDetails:{
        flex:1,
        flexDirection:'row',
        marginTop:5,
    },
    profileDP:{
        width:40,
        height:40,
        resizeMode:'contain',
        borderRadius:100,
    },
    userName:{
        paddingLeft:10,
        fontSize:17,
    },
    message:{
        paddingLeft:10,
    },
    unreadMessagesCount:{
        position:'absolute',
        bottom:10,
        right:10,
        backgroundColor:'#0a2351',
        paddingHorizontal:5,
        borderRadius:100,
    },
    messageCount:{
        color:'#fff',
        fontSize:14,
    }

});
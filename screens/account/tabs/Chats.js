import React from 'react'
import { View, Text, StyleSheet,Image,FlatList } from 'react-native'




function Chats() {
   
    const Content = () => (
        <View style={styles.productHolder}>
               
                <Image 
                        style={styles.productImage}
                        source={{uri: 'https://picsum.photos/170/250'}}/>
                        <Text style={styles.productName}>Offer title </Text>
                        <Text style={styles.productPrice}>Duration</Text>
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
        flexDirection:'row',
        flexWrap:'wrap',
    },
    productImage:{
        width:170,
        height:250,
        resizeMode:'contain',
    },
    productHolder:{
       alignItems:'center',
       marginTop:10,
       marginBottom:20,
       marginHorizontal:2,
        borderColor:'#dfe1e5',
        borderWidth:.5,
        paddingBottom:10,
        width:'48%',

      
    },
    productName:{
        textAlign:'center',
    },
    productPrice:{
        fontSize:17,
    }


});
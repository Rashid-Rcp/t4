import React from 'react'
import { View, Text, StyleSheet,Image,FlatList,TouchableOpacity } from 'react-native'

import { AntDesign } from '@expo/vector-icons'; 

function Products({navigation}) {
    
const Content = () => (
    <View style={styles.productHolder}>
        <TouchableOpacity onPress={()=>{navigation.navigate('SingleProduct')}}>
            <Image 
            style={styles.productImage}
            source={{uri: 'https://picsum.photos/170/250'}}/>
        </TouchableOpacity>   
        <Text style={styles.productName}>product name </Text>
        <Text style={styles.productPrice}>₹ 789</Text>
        <View style={styles.productStatus}>
            <AntDesign name="checkcircle" size={15} color="#0a2351"/>
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

export default Products;

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
    },
    productStatus:{
        position:'absolute',
        bottom:10,
        right:10,
    }


});
import React from 'react'
import { View, Text, FlatList, StyleSheet,Image,TouchableOpacity } from 'react-native';
import ProductsImages from './account/tabs/ProductsImages';

function Test() {

  


    return (
       <View style={styles.container}>
            <View style={{flex:1}}>

            
            <ProductsImages productID={20} images ={'["https://picsum.photos/170/250","https://picsum.photos/170/250"]'} />

         </View>
         
       </View>
    )
}

export default Test

const styles=StyleSheet.create({
   container:{
     flex:1,
     backgroundColor:'red',
   }

});

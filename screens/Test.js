import React from 'react'
import { View, Text, FlatList, StyleSheet,Image } from 'react-native'

function Test() {

    const Content = () => (
        <View style={styles.productHolder}>
               
                <Image 
                style={styles.productImage}
                source={{uri: 'https://picsum.photos/180/250'}}/>
                <Text >product name item name product name item name product name item name</Text>
                <Text >₹ 789</Text>
        </View>
      );


    const DATA = [
        {
          id: '1',
         
        },
        {
          id: '2',
          
        },
        {
          id: '3',
         
        },
        {
            id: '4',
           
          },
          {
            id: '5',
           
          },
          {
            id: '6',
           
          },
          {
            id: '7',
           
          },
      ];
    return (
       <View style={styles.container}>
        <FlatList
                    data={DATA}
                    renderItem={Content}
                    numColumns={2}
                    keyExtractor={item => item.id} />
                    
       </View>
    )
}

export default Test

const styles=StyleSheet.create({
    productImage:{
        width:180,
        height:250,
    },
    container:{
        flex:1,
       
       
    },
    productHolder:{
       flexDirection:'column',
       width:'50%',
    }


});

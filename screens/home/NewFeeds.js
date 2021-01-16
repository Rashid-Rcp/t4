import React from 'react'
import { StyleSheet, View,Text, FlatList,Dimensions } from 'react-native'

import ProductHeader from '../products/ProductHeader';
import ProductMedia from '../products/ProductMedia';
import ProductFooter from '../products/ProductFooter';
import ProductDetails from '../products/ProductDetails';


function NewFeeds({itemType}) {
    const width = Dimensions.get('window').width;
    const widthPercentage =((1080-width)/1080) *100;
    const height = (1350/100) * (100-widthPercentage);
    const mediaDimension = {
      width:width,
      height:height,
    }

    // const mediaWidthHeight = {
    //   width:'',
    //   height:''
    // }


    const DATA = [
        {
          id: '1',
          title: 'First Item 01',
        },
        {
          id: '2',
          title: 'Second Item 2',
        },
        {
          id: '3',
          title: 'Second Item 3',
        },
      
      ];
      const renderItem = ({ item }) => (
        <View>
            <ProductHeader/>
            <ProductMedia mediaDimension={mediaDimension}/>
            <ProductDetails itemType={itemType}/>
            <ProductFooter/>
        </View>
      );

    return (
         <View style={styles.newFeeds}>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />
     </View>
             
       
    )
}

export default NewFeeds

const styles = StyleSheet.create({
    newFeeds:{
        flex:1,
       backgroundColor:'#fff',
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      title: {
        fontSize: 32,
      },
});
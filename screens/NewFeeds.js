import React from 'react'
import { StyleSheet, View,Text, FlatList } from 'react-native'

import ProductHeader from './products/ProductHeader';
import ProductMedia from './products/ProductMedia';


function NewFeeds() {

    const DATA = [
        {
          id: '1',
          title: 'First Item 01',
        },
        // {
        //   id: '2',
        //   title: 'Second Item 2',
        // },
        // {
        //   id: '3',
        //   title: 'Third Item 3',
        // },
        // {
        //     id: '4',
        //     title: 'First Item 4',
        //   },
        //   {
        //     id: '5',
        //     title: 'Second Item 5',
        //   },
        //   {
        //     id: '6',
        //     title: 'Third Item 6',
        //   },
        //   {
        //     id: '7',
        //     title: 'First Item 7',
        //   },
        //   {
        //     id: '8',
        //     title: 'Second Item 8',
        //   },
        //   {
        //     id: '9',
        //     title: 'Third Item 9' ,
        //   },
        //   {
        //     id: '10',
        //     title: 'First Item 10',
        //   },
        //   {
        //     id: '11',
        //     title: 'Second Item 11',
        //   },
        //   {
        //     id: '12',
        //     title: 'Third Item 12',
        //   },
      ];
      const renderItem = ({ item }) => (
        <View>
            <ProductHeader/>
            <ProductMedia/>
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
       backgroundColor:'#ccc',
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
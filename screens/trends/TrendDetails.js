import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import NewFeeds from '../home/NewFeeds';
import Footer from '../common/Footer'
function TrendDetails({navigation}) {
    return (
       <View style={styles.container}>
          <NewFeeds itemType={{type:'product',filter:'shop_type'}}/>
          <Footer navigation = {navigation}/>
       </View>
    )
}

export default TrendDetails

const styles = StyleSheet.create({
 container:{
     flex:1,
 }
});


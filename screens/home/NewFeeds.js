import React,{useState, useEffect, useContext} from 'react'
import { StyleSheet, View,Text, FlatList,Dimensions } from 'react-native'
import axios from 'axios';

import ProductHeader from '../products/ProductHeader';
import ProductMedia from '../products/ProductMedia';
import ProductFooter from '../products/ProductFooter';
import ProductDetails from '../products/ProductDetails';
import {UserContext} from '../common/UserContext';

function NewFeeds({itemType}) {
    const [user, setUser] = useContext(UserContext);
    
    const width = Dimensions.get('window').width;
    const widthPercentage =((1080-width)/1080) *100;
    const height = (1350/100) * (100-widthPercentage);
    const mediaDimension = {
      width:width,
      height:height,
    }
    const [products, setProducts] = useState([]);
    const location = 'malappuram';

    // const mediaWidthHeight = {
    //   width:'',
    //   height:''
    // }
    
    useEffect(()=>{
      axios.get(global.APILink+'/products_by_location/'+location+'/'+user.id)
      .then(res=>{
       res.data && setProducts(res.data)
      })
      .catch(err=>console.log(err))
    },[])

  
      const renderItem = ({ item }) => (
        <View style={{flex:1}}>
            <ProductHeader shopDetails={item}/>
            <ProductMedia images={item.images} mediaDimension={mediaDimension}/>
            <ProductDetails productDetails={item} itemType={itemType}/>
            <ProductFooter productDetails={item}/>
        </View>
      );

    return (
         <View style={styles.newFeeds}>
            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
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
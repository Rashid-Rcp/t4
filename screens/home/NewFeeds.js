import React,{useState, useEffect, useContext} from 'react'
import { StyleSheet, View,Text, FlatList,Dimensions } from 'react-native'
import axios from 'axios';

import ProductHeader from '../products/ProductHeader';
import ProductMedia from '../products/ProductMedia';
import ProductFooter from '../products/ProductFooter';
import ProductDetails from '../products/ProductDetails';
import {UserContext} from '../common/UserContext';
import {KeywordContext} from './KeywordContext';

function NewFeeds({itemType, refreshKeywordsHandler, activeKey}) {
    const [user, setUser] = useContext(UserContext);
  
    const [keywords, setKeywords] = useContext(KeywordContext);
    
    const width = Dimensions.get('window').width;
    const widthPercentage =((1080-width)/1080) *100;
    const height = (1350/100) * (100-widthPercentage);
    const mediaDimension = {
      width:width,
      height:height,
    }
    const [products, setProducts] = useState([]);
    

    useEffect(() => {
    
      if(products.length>0){
        let productTypes = keywords;
        products.map((item)=>{
          let type=item.type;
          if(productTypes.length<10 && productTypes.indexOf(type) === -1){
            productTypes.push(type);
          }
        });
        //console.log('new feeds');
        setKeywords(productTypes);
        refreshKeywordsHandler(1)
        //console.log(keywords);

      }
    }, [products])
    // const mediaWidthHeight = {
    //   width:'',
    //   height:''
    // }
    //console.log(global.APILink+'/products_by_location/'+location+'/'+user.id);
    
    useEffect(()=>{
     
      if(user.id !=='0'){
        axios.get(global.APILink+'/products_by_location/'+user.location+'/'+user.id)
        .then(res=>{
         console.log(res.data);
         res.data && setProducts(res.data)
        })
        .catch(err=>console.log(err))
      }
      
    },[user])

  
      const renderItem = ({ item }) => {
        if( activeKey==='All' || activeKey===item.type){
          return(
            <View style={{flex:1}}>
                <ProductHeader shopDetails={item}/>
                <ProductMedia images={item.images} mediaDimension={mediaDimension}/>
                <ProductDetails productDetails={item} itemType={itemType}/>
                <ProductFooter productDetails={item}/>
            </View>
          )
        }

      
      };

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
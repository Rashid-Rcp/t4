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
          if(productTypes.length<20 && productTypes.indexOf(type) === -1){
            productTypes.push(type);
          }
        });
       
        setKeywords(productTypes);
        refreshKeywordsHandler(1)
      }
    }, [products])
    
    
    useEffect(()=>{
      if(user.id !=='0'){
        axios.get(global.APILink+'/products_by_location/'+user.location+'/'+user.id+'/'+activeKey)
        .then(res=>{
         res.data && setProducts(res.data.data)
        })
        .catch(err=>console.log(err))
      }
      
    },[user, activeKey])

  
      const renderItem = ({ item }) => {
       
          return(
            <View style={{flex:1}}>
                <ProductHeader shopDetails={item}/>
                <ProductMedia images={item.images} mediaDimension={mediaDimension}/>
                <ProductDetails productDetails={item} itemType={itemType}/>
                <ProductFooter productDetails={item}/>
            </View>
          )
        
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
import React,{useState, useEffect, useContext} from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions,RefreshControl,FlatList } from 'react-native';
import axios from 'axios';

import {UserContext} from '../common/UserContext';
import ProductHeader from '../products/ProductHeader';
import ProductMedia from '../products/ProductMedia';
import ProductDetails from '../products/ProductDetails';
import ProductFooter from '../products/ProductFooter';
import Footer from '../common/Footer'
import ComponentLoader from '../common/ComponentLoader';

function TrendDetails({navigation,route}) {

    const [isLoading, setIsLoading] = useState(true);
    const [isLoadMore, setIsLoadMore] = useState(false);
    const [refreshing, setRefreshing] = useState(true);
    const [user, setUser] = useContext(UserContext);
    const {shopId, productId} = route.params;
    const [products, setProducts] = useState([]);
    const [loadMoreUrl, setLoadMoreUrl] = useState(null);
    const width = Dimensions.get('window').width;
    const widthPercentage =((1080-width)/1080) *100;
    const height = (1350/100) * (100-widthPercentage);
    const mediaDimension = {
      width:width,
      height:height,
    }

    useEffect(()=>{
        if(refreshing){
            axios.get(global.APILink+'/products_by_shop/'+shopId+'/'+productId+'/'+user.id)
            .then(res=>{
                isLoading && setIsLoading(false);
                refreshing && setRefreshing(false);
                res.data && setProducts(res.data.data);
                res.data && setLoadMoreUrl(res.data.next_page_url);
            })
            .catch(err=>console.log(err))
        }
    },[refreshing])

    useEffect(()=>{
        user.id !== '0' && setRefreshing(true);
    },[user])

    const onRefresh = ()=>{
        setRefreshing(true);
    }
    const loadMoreData = ()=>{
        if(loadMoreUrl !== null){
            setIsLoadMore(true);
            axios.get(loadMoreUrl)
            .then(res=>{
                res.data && setProducts([...products,...res.data.data]);
                res.data && setLoadMoreUrl(res.data.next_page_url);
                res.data && setIsLoadMore(false);
            })
            .catch(err=>console.log(err))
        }
    }
    const renderItem = ({ item }) => {
        return(
          <View style={{flex:1}}>
              <ProductHeader shopDetails={item} navigation={navigation}/>
              <ProductMedia images={item.images} mediaDimension={mediaDimension}/>
              <ProductDetails productDetails={item} itemType={{type:'product'}}/>
              <ProductFooter productDetails={item}/>
          </View>
        )
    };

    return (
        <View style={styles.container}>
            {
                isLoading && <ComponentLoader height={100}/>
            }
            {
                !isLoading && <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}
                onEndReached={loadMoreData}
                onEndReachedThreshold={0.5}
                refreshControl={  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }
                />
            }
            {
                isLoadMore && <View style={{height:50}}>
                    <ActivityIndicator size="small" color="#0a2351"  />
                </View>
                }
            <Footer navigation = {navigation}/> 
        </View>
    )
    
    
}

export default TrendDetails

const styles = StyleSheet.create({
 container:{
     flex:1,
     backgroundColor:"#fff",
 }
});


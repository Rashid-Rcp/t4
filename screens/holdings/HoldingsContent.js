import React,{useEffect, useState, useContext} from 'react';
import { View,Text,StyleSheet,Dimensions, FlatList, RefreshControl,ActivityIndicator } from 'react-native';
import axios from 'axios';

import {UserContext} from '../common/UserContext';
import ProductHeader from '../products/ProductHeader';
import ProductMedia from '../products/ProductMedia';
import ProductFooter from '../products/ProductFooter';
import ProductDetails from '../products/ProductDetails';
import ComponentLoader from '../common/ComponentLoader';

function HoldingsContent({navigation}) {

    const [user, setUser]= useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(true);
    const [isLoadingMore, setIsLoadingMore]= useState(false);
    const [loadingMoreUrl,setLoadingMoreUrl] = useState(null);
    const [holdings, setHoldings] = useState([]);
    const width = Dimensions.get('window').width;
    const widthPercentage =((1080-width)/1080) *100;
    const height = (1350/100) * (100-widthPercentage);
    const mediaDimension = {
      width:width,
      height:height,
    }

    const [itemRemoved, setItemRemoved] = useState(0);
    
    useEffect(()=>{
        if(user.id!=='0' && refreshing){
            axios.get(global.APILink+'/holdings/'+user.id)
            .then(res=>{
                res.data && setHoldings(res.data.data);
                res.data && setLoadingMoreUrl(res.data.next_page_url);
                (res.data && isLoading) && setIsLoading(false);
                setRefreshing(false);
            })
            .catch(err=>console.log(err))
        }
    },[user,refreshing])

    const loadMoreData =()=>{
        if(loadingMoreUrl !== null){
            setIsLoadingMore(true);
            axios.get(loadingMoreUrl)
            .then(res=>{
                res.data && setHoldings([...holdings,...res.data.data]);
                res.data && setLoadingMoreUrl(res.data.next_page_url);
                res.data && setIsLoadingMore(false);
               
            })
            .catch(err=>console.log(err))
        }
    }

    const onRefresh = ()=>{
        setRefreshing(true);
    }

    const removeItemFromHoldings =(id, holdingType)=>{
        let items = holdings;
        holdings.forEach((item,index )=> {
            if(item.id === id && item.holding_type === holdingType){
                items.splice(index, 1);
            }
        });
        setHoldings(items);
        setItemRemoved(itemRemoved+1);
    }
    const renderItem = ({ item }) => {
        return(
          <View style={{flex:1}}>
              <ProductHeader shopDetails={item}/>
              <ProductMedia images={item.images} mediaDimension={mediaDimension} type={item.holding_type}/>
              <ProductDetails productDetails={item} itemType={{'type':item.holding_type}}/>
              <ProductFooter productDetails={item} type={item.holding_type} navigation={navigation} isHolding={true} removeItemFromHoldings={removeItemFromHoldings}/>
          </View>
        )
    };

    if(isLoading){
        return (
            <ComponentLoader height={100} />
        )
    }
    else{
        return (
            <View style={styles.container}>
                {
                    holdings.length === 0 && <Text style={styles.noData}>
                        No items in your holdings
                    </Text>
                }
                <FlatList
                    data={holdings}
                    renderItem={renderItem}
                    keyExtractor={(item,index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    onEndReached={loadMoreData}
                    onEndReachedThreshold={0.5}
                    refreshControl={  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }
                    />
                {
                isLoadingMore && <View style={{height:50}}>
                    <ActivityIndicator size="small" color="#0a2351"  />
                </View>
                }
            </View>
        )
    }
    
}

export default HoldingsContent;

const styles =StyleSheet.create({
    container:{
        flex:1,
      
    },
    noData:{
        textAlign:'center',
        paddingHorizontal:10,
        paddingVertical:30,
        fontSize:17,
        color:"#333333"
    }
});
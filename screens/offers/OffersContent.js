import React,{useState, useEffect, useContext} from 'react';
import { View,Text, StyleSheet, FlatList,Dimensions,RefreshControl,ActivityIndicator } from 'react-native';
import axios from 'axios';

import ProductHeader from '../products/ProductHeader';
import ProductMedia from '../products/ProductMedia';
import ProductDetails from '../products/ProductDetails';
import ProductFooter from '../products/ProductFooter';
import { UserContext } from '../common/UserContext';
import ComponentLoader from '../common/ComponentLoader';

function OffersContent({navigation}) {

    const [user, setUser] =useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [loadingMoreUrl, setLoadingMoreUrl] = useState(null);
    const [offers, setOffers]= useState([]);
    const width = Dimensions.get('window').width;
    const widthPercentage =((1080-width)/1080) *100;
    const height = (1350/100) * (100-widthPercentage);
    const mediaDimension = {
        width:width,
        height:height,
      }

    const renderItem = ({item})=>{
        return (
            <View style={{flex:1}}>
                <ProductHeader shopDetails={item}/>
                <ProductMedia images={item.images} mediaDimension={mediaDimension}  type="offers" />
                <ProductDetails productDetails={item} itemType={{type:'offers'}}/>
                <ProductFooter productDetails={item} navigation={navigation} type='offers'/>
            </View>
        )
    }

    useEffect(()=>{
        if(refreshing && user.location !== 'no_location'){
            axios.get(global.APILink+'/offers_by_location/'+user.location+'/'+user.id)
            .then(res=>{
                res.data && setOffers(res.data.data);
                res.data && setLoadingMoreUrl(res.data.next_page_url);
                (res.data && isLoading ) && setIsLoading(false);
                res.data && setRefreshing(false)
            })
            .catch(err=>console.log(err))
        }
    },[refreshing])

    useEffect(()=>{
        setIsLoading(true);
        setRefreshing(true);
    },[user])

    const onRefresh =()=>{
        setRefreshing(true);
    }

    const loadMoreData = ()=>{
        if(loadingMoreUrl !== null){
            setIsLoadingMore(true)
            axios.get(loadingMoreUrl)
            .then(res=>{
                res.data && setOffers([...offers,...res.data.data]);
                res.data && setLoadingMoreUrl(res.data.next_page_url);
                res.data && setIsLoadingMore(false)
            })
            .catch(err=>console.log(err))
        }
    }
    if(isLoading){
        return (
            <ComponentLoader height={100} />
        )
    }
    else{
        return (
            <View style={styles.container}>
                {
                    (offers.length === 0 && user.location !== 'no_location') && <Text style={styles.noData}>
                        There is no offers posted by any retailer from {user.location}
                    </Text>
                }
                {
                    user.location === 'no_location' && <Text style={styles.noData}>
                    Please provide your location.
                </Text>
                }
                {
                    user.location !== 'no_location' && <FlatList
                    data={offers}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    onEndReached={loadMoreData}
                    onEndReachedThreshold={0.5}
                    refreshControl={
                      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                />
                }
                {
                isLoadingMore && <View style={{height:50}}>
                    <ActivityIndicator size="small" color="#0a2351"  />
                </View>
                }
            </View>
        )
    }
    
}

export default OffersContent

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    noData:{
        paddingVertical:20,
        paddingHorizontal:10,
        textAlign:'center',
        fontSize:17,
    }

})

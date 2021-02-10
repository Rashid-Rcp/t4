import React,{useState, useEffect, useContext} from 'react';
import { View,Text,TouchableOpacity,StyleSheet,ScrollView,FlatList,Image,Dimensions, RefreshControl,ActivityIndicator } from 'react-native';
import axios from 'axios';

import {UserContext} from '../common/UserContext';
import ComponentLoader from '../common/ComponentLoader';

function TrendsContent({navigation}) {

    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [user, setUser] = useContext(UserContext);
    const width = (Dimensions.get('window').width)/3;
    const widthPercentage =((1080-width)/1080) *100;
    const height = (1350/100) * (100-widthPercentage);
    const [products, setProducts] =useState([]);
    const [loadMoreUrl, setLoadMoreUrl] = useState(null)

    useEffect(()=>{
      if(user.location !== 'no_location'){
        setIsLoading(true)
        axios.get(global.APILink+'/trends_by_location/'+user.location)
        .then(res=>{
          res.data && setProducts(res.data.data);
          res.data && setLoadMoreUrl(res.data.next_page_url);
          res.data && setIsLoading(false);
        })
        .catch(err=>console.log(err))
      }
    },[user])

   const loadMoreData =()=>{
    if(loadMoreUrl !== null){
      setIsLoadingMore(true);
      axios.get(loadMoreUrl)
      .then(res=>{
        res.data && setProducts([...products,...res.data.data]);
        res.data && setLoadMoreUrl(res.data.next_page_url);
        setIsLoadingMore(false);
      })
    }
   }

   const onRefresh = ()=>{
     setRefreshing(true);
      axios.get(global.APILink+'/trends_by_location/'+user.location)
      .then(res=>{
        res.data && setProducts(res.data.data);
        res.data && setLoadMoreUrl(res.data.next_page_url);
        setRefreshing(false);
      })
      .catch(err=>console.log(err))
   }

    const renderItem = ({ item }) => {
    return(
      <View style={styles.imageHolder}>
          <TouchableOpacity onPress={()=>navigation.navigate('TrendDetails',{shopId:item.user_id,productId:item.id})}>
              <Image source={{uri:global.serverPublic+'/products/'+JSON.parse(item.images)[0]}} 
              style={{width:width,height:height, resizeMode:'contain',borderWidth:2,borderColor:'#fff',}} />
          </TouchableOpacity>
      </View>
    );
    }

    if(isLoading){
      return (
        <ComponentLoader height={100} />
      )
    }
    else {
    return (
        <View style={styles.container}>
            {
              products.length === 0 && <Text style={styles.noItemMessage}>
                {
                  user.location === 'no_location' && <Text>
                    Please provide your location.
                  </Text>
                }
                {
                  (user.location !== 'no_location' || user.location !== '') && <Text>
                    There is no items posted by any retailer for {user.location}
                  </Text>
                }
              </Text>
            }
           
            <FlatList
                columnWrapperStyle={{justifyContent: 'space-around'}}
                data={products}
                numColumns={3}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}
                onEndReached={loadMoreData}
                onEndReachedThreshold={0.5}
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
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

export default TrendsContent;

const styles =StyleSheet.create({
    container:{
        flex:1,
    },
    imageHolder:{
        padding:2,
    },
    noItemMessage:{
      textAlign:'center',
      padding:10,
      fontSize:17,
      color:"#333333",
      marginTop:50,
    }
});
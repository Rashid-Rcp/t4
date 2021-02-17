import React,{useState, useEffect, useContext} from 'react'
import { StyleSheet, View,Text, FlatList,Dimensions,ActivityIndicator,Button,RefreshControl,ScrollView } from 'react-native'
import axios from 'axios';

import ProductHeader from '../products/ProductHeader';
import ProductMedia from '../products/ProductMedia';
import ProductFooter from '../products/ProductFooter';
import ProductDetails from '../products/ProductDetails';
import {UserContext} from '../common/UserContext';
import ComponentLoader from '../common/ComponentLoader';

function NewFeeds({itemType, navigation, activeKey}) {

    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [user, setUser] = useContext(UserContext);
    const width = Dimensions.get('window').width;
    const widthPercentage =((1080-width)/1080) *100;
    const height = (1350/100) * (100-widthPercentage);
    const mediaDimension = {
      width:width,
      height:height,
    }
    const [products, setProducts] = useState([]);
    const [loadMoreUrl, setLoadMoreUrl] = useState(null);

    const loadMoreData = ()=>{
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
   
    useEffect(()=>{
      if(user.fetch){
        setIsLoading(true);
        axios.get(global.APILink+'/products_by_location/'+user.location+'/'+user.id+'/'+activeKey)
        .then(res=>{
         res.data && setProducts(res.data.data);
         res.data && setLoadMoreUrl(res.data.next_page_url);
         setIsLoading(false);    
        })
        .catch(err=>console.log(err))
      }
    },[user, activeKey])

    const onRefresh =()=>{
      setRefreshing(true);
      axios.get(global.APILink+'/products_by_location/'+user.location+'/'+user.id+'/'+activeKey)
      .then(res=>{
       res.data && setProducts(res.data.data);
       res.data && setLoadMoreUrl(res.data.next_page_url);
       setRefreshing(false);    
      })
      .catch(err=>console.log(err))
    }

    const renderItem = ({ item }) => {
        return(
          <View style={{flex:1}}>
              <ProductHeader shopDetails={item}/>
              <ProductMedia images={item.images} mediaDimension={mediaDimension}/>
              <ProductDetails productDetails={item} itemType={itemType}/>
              <ProductFooter productDetails={item} navigation={navigation}/>
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
        <View style={styles.newFeeds}>
           {
              products.length === 0 && <ScrollView 
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              ><View style={styles.noItemContainer}>
                {
                  user.location === 'no_location' && <Text style={styles.notItemMessage}>
                    Please provide your location for viewing available products and offers. 
                  </Text>
                }
                {
                  user.location !== 'no_location' && activeKey !=='All' && <Text style={styles.notItemMessage}>
                  There is no item posted for {activeKey} by any retailer from  {user.location}
                  </Text>
                }
                <Text style={styles.notItemMessage}>
                  Follow more shop for viewing their recent products.
                </Text>
                <View style={{marginVertical:20}}>
                  <Text style={styles.notItemMessage}>
                    View all available products from your location.
                  </Text>
                    <Button  onPress={()=>navigation.navigate('Trends')} title="View products" color="#333333" />
                </View>
                <View style={{marginVertical:20}}>
                  <Text style={styles.notItemMessage}>
                    View all available offers from your location.
                  </Text>
                    <Button title="View offers" onPress={()=>navigation.navigate('Offers')} color="#333333" />
                </View>
              </View>
              </ScrollView> 
            }
            <FlatList
                data={products}
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

export default NewFeeds;

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
      noItemContainer:{
        flexDirection:'column',
        padding:10,
      },
      notItemMessage:{
        marginBottom:15,
        fontSize:18,
        color:"#333333",
        textAlign:'center',
      }
});
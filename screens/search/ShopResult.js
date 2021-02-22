import React,{useState, useEffect, useContext} from 'react';
import { View, Text,Image,TouchableOpacity,StyleSheet, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';

import ComponentLoader from '../common/ComponentLoader';

function ShopResult({search,location, navigation}) {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [shops, setShops] = useState([]);
    const [loadMoreUrl, setLoadMoreUrl] = useState(null); 

    useEffect(()=>{
        if(search !== ''){
            setIsLoading(true);
            axios.get(global.APILink+'/search_shops/'+search+'/'+location)
            .then(res=>{
                res.data && setShops(res.data.data);
                res.data && setLoadMoreUrl(res.data.next_page_url);
                res.data && setIsLoading(false);
            })
            .catch(err=>console.log(err))
        }
    },[search,location])

    const loadMoreData = ()=>{
        if(loadMoreUrl !== null){
            setIsLoadingMore(true);
            axios.get(loadMoreUrl)
            .then(res=>{
                res.data && setShops([...shops,...res.data.data]);
                res.data && setLoadMoreUrl(res.data.next_page_url);
                res.data && setIsLoadingMore(false);
            })
            .catch(err=>console.log(err))  
        }
         
    }

    if(search){
        return (
            <View style={styles.container}>
                {
                shops.map((item)=>{
                    return(
                        <TouchableOpacity key={item.id} onPress={()=> navigation.navigate('Account',{accountId:item.id.toString()})}>
                            <View   style={styles.shopHolder}>
                                <Image source={{uri:global.serverPublic+'/images/'+item.image}}
                                    style={styles.shopDP}
                                />
                                <Text style={styles.shopName}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })
                }
               
                {
                    (loadMoreUrl !== null && !isLoadingMore) && <View>
                        <Button onPress={loadMoreData} title='Show more' color="#333333"/>
                    </View>
                }
                {
                    isLoadingMore &&<View style={{height:50}}>
                    <ActivityIndicator size="small" color="#0a2351"  />
                </View>
                }
                {
                    isLoading && <View style={styles.loader}>
                    <ActivityIndicator size="small" color="#0a2351"  />
                    </View>
                }
                
            </View>
        )
    }
    else{
        return ( <View></View>)
    }
    
}

export default ShopResult
const styles = StyleSheet.create({
    container:{
       
        marginTop:10,
    },
    shopHolder:{
       alignItems:'center',
        flexDirection:'row',
        marginVertical:10,
    },
    shopDP:{
        width:50,
        height:50,
        resizeMode:'contain',
        borderRadius:100,
    },
    shopName:{
        paddingLeft:10,
        fontSize:17,
    },
    loader:{
        height:'100%',
        width:'100%',
        backgroundColor:"#f7f7f7",
        opacity:.9,
        position:'absolute',
        alignItems:'center',
        justifyContent:'center',
    }
});

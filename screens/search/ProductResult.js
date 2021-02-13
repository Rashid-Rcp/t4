import React,{useEffect, useState} from 'react'
import { View, Text,Image,TouchableOpacity,StyleSheet,Dimensions,ActivityIndicator,Button } from 'react-native';
import axios from 'axios';


function ProductResult({navigation,search, location}) {
    const width = (Dimensions.get('window').width)/3;
    const widthPercentage =((1080-width)/1080) *100;
    const height = (1350/100) * (100-widthPercentage);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [loadingMoreUrl, setLoadingMoreUrl] = useState(null);

    useEffect(()=>{
        if(search){
            setIsLoading(true);
            axios.get(global.APILink+'/search_products/'+search+'/'+location)
            .then(res=>{
                res.data && setIsLoading(false);
                res.data && setProducts(res.data.data);
                res.data && setLoadingMoreUrl(res.data.next_page_url);
            })
            .catch(err=>console.log(err))
        }

    },[search, location])

    const loadMoreData = ()=>{
        if(loadingMoreUrl !== null){
            setIsLoadingMore(true);
            axios.get(loadingMoreUrl)
            .then(res=>{
                res.data && setProducts([...products,...res.data.data]);
                res.data && setLoadingMoreUrl(res.data.next_page_url);
                setIsLoadingMore(false);
            })
            .catch(err=>console.log(err))
        }
    }

 
  if(search){
    return (
        <>
        <View style={styles.container}>
        {
        products.map((item)=>{
            return(
                <View key={item.id} style={styles.productHolder}>
                    <TouchableOpacity onPress={()=>navigation.navigate('TrendDetails',{shopId:item.user_id,productId:item.id})}>
                        <Image source={{uri:global.serverPublic+'/products/'+JSON.parse(item.images)[0]}} 
                        style={{width:width,height:height, resizeMode:'contain',borderWidth:2,borderColor:'#fff',}} />
                    </TouchableOpacity>
                </View>
            )
        })
        }
        </View>
        {
        (loadingMoreUrl !== null && !isLoadingMore) && <View style={styles.showMore}>
            <Button onPress={loadMoreData} title='Show more' color="#333333"/>
        </View>
        }
        {
        isLoading && <View style={styles.loader}>
        <ActivityIndicator size="small" color="#0a2351"  />
        </View>
        }
        {
        isLoadingMore &&<View style={{height:100,marginTop:20}}>
            <ActivityIndicator size="small" color="#0a2351"  />
        </View>
        }
        </>
    )
  }
  else{
      return ( <View></View>)
  }
    
}

export default ProductResult
const styles = StyleSheet.create({
    container:{
        paddingTop:15,
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap',
    },
    productHolder:{
        width:'33%',
    },
    loader:{
        height:'100%',
        width:'100%',
        backgroundColor:"#f7f7f7",
        opacity:.9,
        position:'absolute',
        alignItems:'center',
        justifyContent:'center',
    },
    showMore:{
        marginTop:20,
    }
});

import React,{useState, useEffect} from 'react'
import { View, Text, StyleSheet,ActivityIndicator, TouchableWithoutFeedback,TouchableOpacity } from 'react-native'

import { AntDesign,Ionicons } from '@expo/vector-icons'; 
import axios from 'axios';
import ProductsImages from './ProductsImages';
import ComponentLoader from '../../common/ComponentLoader';

function Products({navigation, fetchItem, setFetchItem, scrollEnd, selfAccount, resetScrollEnd, accountId}) {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [refreshCount,setRefreshCount] = useState(0);
    const toDay = new Date();
   
    useEffect(()=>{
            if(fetchItem){
                setIsLoading(true);
                axios.get(global.APILink+'/products/user/'+accountId)
                .then(res=>{
                    res.data && setProducts(res.data.data);
                    res.data && setNextPage(res.data.next_page_url);
                    res.data && setIsLoading(false);
                    res.data && setFetchItem(false);
                })
                .catch(err=>console.log(err));
                axios.get(global.APILink+'/products/refresh/'+accountId)
                .then(res=>{
                    setRefreshCount(res.data.count);
                })
                .catch(err=>console.log(err));
            }
    },[fetchItem])

    useEffect(()=>{
        if(scrollEnd && nextPage !== null){
            setIsLoadingMore(true);
            axios.get(nextPage)
            .then(res=>{
                res.data && setProducts([...products,...res.data.data]);
                res.data && setNextPage(res.data.next_page_url);
                res.data && setIsLoadingMore(false);
                res.data && resetScrollEnd();
            })
            .catch(err=>console.log(err))

        }
    },[scrollEnd])

    const refreshProduct = (productId)=>{
        let newProductList = [...products];
        let refreshed_at = new Date();
        newProductList.map((item, index)=>{
           if(item.id === productId){
               newProductList[index].refreshed_at = refreshed_at.toISOString();
           }
        });
        setRefreshCount(refreshCount+1);
        setProducts(newProductList);
        axios.post(global.APILink+'/products/refresh',{productId:productId,userId:accountId})
        .then(res=>{
            if(res.data.status === 'success'){
               //refresh count incremented
            }
        })
        .catch(err=>console.log(err))
    }
   
    if(isLoading){
        return (
            <ComponentLoader height={150} />
        )
    }
    else {
        return (
            <>
            <View style={styles.container}>
            {
                products.map((item,index)=>{

                    let enableRefresh = false;
                    if(item.refreshed_at){
                        let refreshed_at = item.refreshed_at.replace(/\s/g , "T");
                        refreshed_at = new Date(refreshed_at);
                        let Difference_In_Time = toDay.getTime() - refreshed_at.getTime();
                        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                        if(Difference_In_Days >= 3){
                            enableRefresh = true;
                        }
                    }
                    
                   if(!selfAccount && item.status !== 'active')  {
                        return <View key={index}></View>
                   }
                   else{
                       return  (
                        <View key={index} style={styles.productHolder}>
                            <ProductsImages navigation={navigation} productID={item.id} images ={item.images} selfAccount={selfAccount}/>
                            { 
                             enableRefresh && refreshCount < 5 ? <TouchableOpacity onPress={()=>refreshProduct(item.id)} style={styles.productRefresh}>
                                <Ionicons name="refresh-circle-sharp" size={40} color="#ffb818"/>
                            </TouchableOpacity>
                            :
                            <View style={styles.productRefresh}>
                                <Ionicons name="refresh-circle-sharp" size={40} color='#ccc'/>
                            </View>
                            }
                            {
                             !enableRefresh &&  <View style={styles.productRefresh}>
                                <Ionicons name="refresh-circle-sharp" size={40} color='#33b864'/>
                             </View>
                            }
                            <TouchableWithoutFeedback onPress={()=>navigation.navigate('SingleProduct',{productId:item.id, selfAccount:selfAccount})}>
                                <Text style={styles.productName}>{item.title}</Text>
                            </TouchableWithoutFeedback>
                            <Text style={styles.productPrice}>₹{item.price}</Text>
                            <View style={styles.productStatus}>
                                <AntDesign name="checkcircle" size={15} color={item.status==='active'?"#33b864":'#ccc'}/>
                            </View>
                        </View>
                        )
                   }
                  
                })
             } 
             {
                 products.length === 0 && <Text style={styles.noData}>
                     No data found.
                 </Text>
             }
            </View>
            {
                isLoadingMore && <View style={{height:50}}>
                  <ActivityIndicator size="small" color="#0a2351"  />
                </View>
              }
            </>
        )
    }
    
}

export default Products;

const styles=StyleSheet.create({

    container:{
        flex:1,
        paddingHorizontal:5,
        flexDirection:'row',
        flexWrap:'wrap',
    },
    productHolder:{
      
       alignItems:'center',
       marginTop:10,
       marginBottom:20,
       marginHorizontal:2,
        borderColor:'#dfe1e5',
        borderWidth:.5,
        paddingBottom:10,
        width:'48%',

    },
    productName:{
        textAlign:'center',
    },
    productPrice:{
        fontSize:17,
    },
    productStatus:{
        position:'absolute',
        bottom:10,
        right:10,
    },
    noData:{
        textAlign:'center',
        marginTop:30,
        width:'100%',
    },
    productRefresh:{
    position:'absolute',
    bottom:60,
    right:10,
    backgroundColor:'#f7f7f7',
    borderRadius:100,
    width:37,
    height:37,
    alignItems:'center',
    justifyContent:'center',
    },


});
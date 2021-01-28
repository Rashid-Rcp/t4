import React,{useState,useEffect, useContext} from 'react'
import { View, Text, StyleSheet,Image,FlatList,TouchableOpacity } from 'react-native'

import { AntDesign } from '@expo/vector-icons'; 
import axios from 'axios';

import ProductsImages from './ProductsImages';
import {UserContext} from '../../common/UserContext';
import ComponentLoader from '../../common/ComponentLoader';

function Products({navigation}) {
    const [user, setUser] = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    useEffect(()=>{
        if(user.id !== '0'){
            axios.get(global.APILink+'/products/user/'+user.id)
            .then(res=>{
            // console.log(res.data);
                res.data.data && setProducts(res.data.data);
                res.data.next_page_url && setNextPage(res.data.next_page_url);
                res.data && setIsLoading(false);
            })
            .catch(err=>console.log(err));
        }
    },[])
    
    

    if(isLoading){
        return (
            <ComponentLoader height={150} />
        )
    }
    else {
        return (
            <View style={styles.container}>
            {
                products.map((item,index)=>{
                  return  (
                    <View key={index} style={styles.productHolder}>
                        <ProductsImages navigation={navigation} productID={item.id} images ={item.images} />
                        <Text style={styles.productName}>{item.title}</Text>
                        <Text style={styles.productPrice}>₹ {item.price}</Text>
                        <View style={styles.productStatus}>
                            <AntDesign name="checkcircle" size={15} color={item.status==='active'?"#0a2351":'#ccc'}/>
                        </View>
                    </View>
                    )
                })
             }
            </View>
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
    }


});
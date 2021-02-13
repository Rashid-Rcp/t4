import React,{useState,useContext, useEffect} from 'react'
import { View,TextInput,StyleSheet,Image,Text,FlatList, TouchableOpacity,KeyboardAvoidingView, RefreshControl,StatusBar,ActivityIndicator } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import axios from 'axios';

import {UserContext} from '../common/UserContext';
import ComponentLoader from '../common/ComponentLoader';

function Comments({route}) {
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [loadMoreUrl, setLoadingMoreUrl] = useState(null);
    const [user, setUser] = useContext(UserContext);
    const [newComment, setNewComment] = useState('');
    const [productComments, setProductComments] = useState([]);
    const {productId} = route.params;
    const {productType} = route.params;
    const postNewComment =()=>{
        if(newComment !== ''){
            setNewComment('');
            axios.post(global.APILink+'/'+productType+'_comments',{productId:productId, userId:user.id,comment:newComment})
            .then(res=>{
                res.data.status === 'success' && setProductComments(res.data.comments);
                res.data.status === 'success' && setLoadingMoreUrl(null);
            })
            .catch(err=>console.log(err))
        }
    }

    useEffect(()=>{
        refreshing && getAllComments();
    },[refreshing])

    const getAllComments = ()=>{
        axios.get(global.APILink+'/'+productType+'_comments/'+productId)
        .then(res=>{
            res.data && setProductComments(res.data.data);
            res.data && setLoadingMoreUrl(res.data.next_page_url);
            (res.data && isLoading) &&  setIsLoading(false);
            res.data && setRefreshing(false);
        })
        .catch(err=>console.log(err));
    }

    const onRefresh = ()=>{
        setRefreshing(true);
    }
    const loadMoreData = ()=>{
        if(loadMoreUrl !== null){
            setIsLoadingMore(true);
            axios.get(loadMoreUrl)
            .then(res=>{
                res.data && setProductComments([...productComments,...res.data.data]);
                res.data && setLoadingMoreUrl(res.data.next_page_url);
                res.data && setIsLoadingMore(false);
            })
            .catch(err=>console.log(err));
        }
        
    }

    const renderItem = ({ item }) => {
        return(
            <View style={styles.commentContainer}>
                <View style={styles.DPHolder}>
                    <Image style={styles.DP} source={{uri:global.serverPublic+'/images/'+item.image}} />
                </View>
                <View style={styles.commentHolder}>
                    <Text style={styles.userName}>{item.name}</Text>
                    <Text style={styles.comment}> {item.comment} </Text>
                </View>
            </View>
        )
    };

 if(isLoading){
     return (
         <ComponentLoader heigh={100}/>
     )
 }
 else{
    return (
        <KeyboardAvoidingView style={{flex:1}}>
       <View style={styles.container}>
       <StatusBar style="auto"/>
       <FlatList
                data={productComments}
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
           <View style={styles.formHolder}>
                <View style={{flex:1}}>
                    <TextInput   
                    multiline 
                    numberOfLines={2}
                    autoFocus={true}
                    style={styles.textArea} 
                    onChangeText={text=>setNewComment(text)}
                    value={newComment}
                    />
                </View>
                <View style={styles.postButton}>
                    <TouchableOpacity onPress={postNewComment}>
                    <MaterialCommunityIcons name="send-circle-outline" size={30} color="#282828" />
                    </TouchableOpacity>
                </View>
            </View>
       </View> 
       </KeyboardAvoidingView>
    )
    }
}

export default Comments

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        paddingTop:15,
        paddingHorizontal:10,
    },
    DP:{
        width:50,
        height:50,
        resizeMode:'contain',
        borderRadius:100,
    },
    commentContainer:{
        flexDirection:'row',
        borderBottomColor:'#f7f7f7',
        borderBottomWidth:1,
        paddingBottom:5,
        marginTop:5,
    },
    DPHolder:{
        marginRight:5,
    },
    userName:{
        fontWeight:'700',
    },
    textArea:{
        borderColor:'#ccc',
        borderWidth:.5,
        borderRadius:5,
        width:'100%',
        padding:5,
    },
    formHolder:{
        marginTop:20,
        flexDirection:'row',
        marginBottom:10,
       
    },
    postButton:{
       marginLeft:10,
       marginRight:5,
       marginTop:5
    }
    
})
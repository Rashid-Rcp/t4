import React,{useState,useContext, useEffect} from 'react'
import { View,TextInput,StyleSheet,Image,Text,ScrollView, TouchableOpacity,KeyboardAvoidingView } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import axios from 'axios';

import {UserContext} from '../common/UserContext';
import ComponentLoader from '../common/ComponentLoader';

function Comments({route}) {
    const [isLoading, setIsLoading] = useState(true);
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
            })
            .catch(err=>console.log(err))
        }
    }

    useEffect(()=>{
        getAllComments();
    },[])

    const getAllComments = ()=>{
        axios.get(global.APILink+'/'+productType+'_comments/'+productId)
        .then(res=>{
            res.data && setProductComments(res.data);
            res.data && setIsLoading(false);
        })
        .catch(err=>console.log(err));
    }
 if(isLoading){
     return (
         <ComponentLoader heigh={100}/>
     )
 }
 else{
    return (
        <KeyboardAvoidingView style={{flex:1}}>
       <View style={styles.container}>
           <ScrollView>
           {
            productComments.map((item, index)=>{
                return (
                <View key={index} style={styles.commentContainer}>
                    <View style={styles.DPHolder}>
                        <Image style={styles.DP} source={{uri:global.serverPublic+'/images/'+item.image}} />
                    </View>
                    <View style={styles.commentHolder}>
                        <Text style={styles.userName}>{item.name}</Text>
                        <Text style={styles.comment}> {item.comment} </Text>
                    </View>
                </View>
                )
            })
            }
           </ScrollView>
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
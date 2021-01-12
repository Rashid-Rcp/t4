import React ,{useContext, useEffect} from 'react'
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';

import {ActiveTabContext} from './tabs/ActiveTabContext'
import {UserContext} from '../common/UserContext';

function Tabs(props) {

    const scrollRef = props.scrollRef.current;

  //scrollRef.current.scrollTo({x: 0, y: 140, animated: true})

    const [activeTab,setActiveTab] = useContext(ActiveTabContext);
    const scrollPosition = 160;

    const [user, setUser] = useContext(UserContext);
   
    useEffect(()=>{
        if(user.type === 'customer'){
            setActiveTab('Chats');
        }
    },[user])

    return (
        <View style={styles.holder}>
            <View style={styles.container}>
                {
                    user.type !== 'customer' && <>
                    <View style={[styles.tabButton,activeTab==='Product'?styles.active:'']}>
                        <TouchableOpacity onPress={()=>{setActiveTab('Product');scrollRef.scrollTo({x: 0, y: scrollPosition, animated: true})}}>
                            <Text>Products</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.tabButton,activeTab==='Offer'?styles.active:'']}>
                        <TouchableOpacity onPress={()=>{setActiveTab('Offer');scrollRef.scrollTo({x: 0, y: scrollPosition, animated: true})}}>
                            <Text>Offers</Text>
                        </TouchableOpacity>
                    </View>
                    </>
                }
                    
                    <View style={[styles.tabButton,activeTab==='Chats'?styles.active:'',user.type==='customer'?styles.chatOnly:'']}>
                        <TouchableOpacity onPress={()=>{setActiveTab('Chats');scrollRef.scrollTo({x: 0, y: scrollPosition, animated: true})}}>
                            <Text style={user.type==='customer'?styles.boldText:''}>Chats</Text>
                        </TouchableOpacity>
                        <View style={styles.unreadMessages}>
                            <Text style={{color:'#fff',fontSize:12,}}>10</Text>
                        </View>
                    </View>
               
            </View>
        </View>
    )
}

export default Tabs;

const styles=StyleSheet.create({
    holder:{
        paddingBottom:5,
        backgroundColor:'#fff',
        paddingRight:5,
    },
    container:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        paddingHorizontal:5,
        borderBottomColor:'#dfe1e5',
        borderBottomWidth:1,
        backgroundColor:'#fff',
       
    },
    tabButton:{
        paddingVertical:10,
        borderWidth:1,
        borderColor:'#dfe1e5',
        flex:1,
        alignItems:'center',
        borderTopLeftRadius:25,
        borderTopRightRadius:5,
        marginHorizontal:3,
        backgroundColor:'#e6e6e6',
        marginBottom:-1,
    },
    active:{
        backgroundColor:'#fff',
        borderBottomColor:'#fff',
    },
    sticky:{

    },
    chatOnly:{
        borderTopLeftRadius:5,
    },
    unreadMessages:{
        position:'absolute',
        bottom:10,
        right:5,
        backgroundColor:'#0a2351',
        paddingHorizontal:5,
        borderRadius:100,
    },
    boldText:{
        fontWeight:'700',
        fontSize:16,
    }
});

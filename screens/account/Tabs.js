import React ,{useContext} from 'react'
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';

import {ActiveTabContext} from './tabs/ActiveTabContext'

function Tabs(props) {

    const scrollRef = props.scrollRef.current;

  //scrollRef.current.scrollTo({x: 0, y: 140, animated: true})

    const [activeTab,setActiveTab] = useContext(ActiveTabContext);
    const scrollPosition = 160;
   
    return (
        <View style={styles.holder}>
            <View style={styles.container}>
                
                    <View style={[styles.tabButton,activeTab==='products'?styles.active:'']}>
                        <TouchableOpacity onPress={()=>{setActiveTab('products');scrollRef.scrollTo({x: 0, y: scrollPosition, animated: true})}}>
                            <Text>Products</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.tabButton,activeTab==='offers'?styles.active:'']}>
                        <TouchableOpacity onPress={()=>{setActiveTab('offers');scrollRef.scrollTo({x: 0, y: scrollPosition, animated: true})}}>
                            <Text>Offers</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.tabButton,activeTab==='chats'?styles.active:'']}>
                        <TouchableOpacity onPress={()=>{setActiveTab('chats');scrollRef.scrollTo({x: 0, y: scrollPosition, animated: true})}}>
                            <Text>Chats</Text>
                        </TouchableOpacity>
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

    }
});

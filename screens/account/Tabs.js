import React ,{useContext, useEffect} from 'react'
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';

import {ActiveTabContext} from './tabs/ActiveTabContext'

function Tabs({scrollRef, setFetchItem}) {

    const [activeTab,setActiveTab] = useContext(ActiveTabContext);
    const scrollPosition = 160;

    if(activeTab !== 'none'){
        return (
            <View style={styles.holder}>
                <View style={styles.container}>
                    <View style={[styles.productButton,activeTab==='Product'?styles.active:'']}>
                        <TouchableOpacity onPress={()=>{scrollRef.current.scrollTo({x: 0, y: scrollPosition, animated: true}),setActiveTab('Product'),setFetchItem(true)}}>
                            <Text>Products</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.offerButton,activeTab==='Offer'?styles.active:'']}>
                        <TouchableOpacity onPress={()=>{setActiveTab('Offer'),setFetchItem(true),scrollRef.current.scrollTo({x: 0, y: scrollPosition, animated: true})}}>
                            <Text>Offers</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </View>
        )
    }
    else {
        return (<></>)
    }
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
    productButton:{
        paddingVertical:10,
        borderWidth:1,
        borderColor:'#dfe1e5',
        flex:1,
        alignItems:'center',
        borderTopLeftRadius:20,
        borderTopRightRadius:5,
        marginHorizontal:3,
        backgroundColor:'#e6e6e6',
        marginBottom:-1,
    },
    offerButton:{
        paddingVertical:10,
        borderWidth:1,
        borderColor:'#dfe1e5',
        flex:1,
        alignItems:'center',
        borderTopRightRadius:20,
        borderTopLeftRadius:5,
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

import React from 'react'

import { View, Text,Image,TouchableOpacity,StyleSheet } from 'react-native';

function ShopResult() {
    const Shops = ()=>{
        return(
            <TouchableOpacity>
                <View style={styles.shopHolder}>
                    <Image source={{uri:'https://picsum.photos/500'}}
                        style={styles.shopDP}
                    />
                    <Text style={styles.shopName}>Shop Name</Text>
                </View>
        </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            <Shops/>
            <Shops/>
            <Shops/>
            <Shops/>
        </View>
    )
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
    }
});

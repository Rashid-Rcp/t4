import React from 'react'

import { View, Text,Image,TouchableOpacity,StyleSheet,Dimensions } from 'react-native';

function ProductResult({navigation}) {
    const width = (Dimensions.get('window').width)/3;
    const widthPercentage =((1080-width)/1080) *100;
    const height = (1350/100) * (100-widthPercentage);
 
    const Products = ()=>{
        return(
            <View style={styles.productHolder}>
            <TouchableOpacity onPress={()=>navigation.navigate('TrendDetails')}>
                <Image source={{uri:'https://picsum.photos/1080/1350'}} 
                style={{width:width,height:height, resizeMode:'contain',borderWidth:2,borderColor:'#fff',}} />
            </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <Products/>
            <Products/>
            <Products/>
            <Products/>
            <Products/>
            <Products/>
            <Products/>
            <Products/>
            
        </View>
    )
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
    }
});

import React from 'react'
import { View, Image, StyleSheet } from 'react-native';

function ProductMedia({mediaDimension}) {
    return (
        <View style={styles.mediaHolder}>
            <Image source={{uri:'https://picsum.photos/1080/1350'}} 
            style={{width:mediaDimension.width,height:mediaDimension.height, resizeMode:'contain'}} />
        </View>
    )
}

export default ProductMedia;

const styles = StyleSheet.create({
    mediaHolder:{
        flex:1,
        alignItems:'center',

    }
});
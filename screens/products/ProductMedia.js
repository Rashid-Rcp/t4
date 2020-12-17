import React from 'react'
import { View, Image, StyleSheet } from 'react-native';

function ProductMedia() {
    return (
        <View style={styles.mediaHolder}>
             <Image 
                style={styles.media} 
                source={{uri: 'https://picsum.photos/500'}}/>
        </View>
    )
}

export default ProductMedia;

const styles = StyleSheet.create({
    media:{
        width:300,
        height:300,
        resizeMode:"contain",
    },
    mediaHolder:{
        flex:1,
        alignItems:'center',

    }
});
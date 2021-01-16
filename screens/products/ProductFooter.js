import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { MaterialCommunityIcons, FontAwesome, Ionicons , MaterialIcons} from '@expo/vector-icons';

function ProductFooter({holdings}) {

    const onHold = holdings || false;

    return (
        <View style={styles.footer}>
            <View style={styles.items}>
                <MaterialCommunityIcons name="heart-outline" size={30} color="#282828" />
                <Text style={styles.count}>110</Text>
            </View>
            <View style={styles.items}>
                <FontAwesome name="comment-o" size={30} color="#282828" />
                <Text style={styles.count}>100</Text>
            </View>
            <View style={styles.items}>
                {!onHold && <FontAwesome name="hand-grab-o" size={30} color="#282828" />}
                {onHold && <MaterialIcons name="highlight-remove" size={30} color="#282828" 
                    style={{borderRadius:100,}} />}
                
            </View>
            <View style={styles.items}>
                <MaterialCommunityIcons name="whatsapp" size={30} color="#282828" />
                <Ionicons style={styles.share} name="share-social-outline" size={30} color="#282828" />
            </View>
        </View>
    )
}

export default ProductFooter;

const styles = StyleSheet.create({
    footer:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingTop:5,
        paddingBottom:10,
        paddingHorizontal:10,
        marginBottom:30,
        borderBottomWidth:.5,
        borderBottomColor:'#e9ebed',
    },
    items:{
        flexDirection:'row',
        alignItems:'center',
    },
    share:{
        marginLeft:5,
    },
    count:{
        paddingLeft:3,
    }

});

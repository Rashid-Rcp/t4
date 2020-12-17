import React from 'react'
import { StyleSheet, View,Text } from 'react-native'
function Footer() {
    return (
        <View style={styles.footer}>
            <Text>Footer</Text>
            <Text>Footer</Text>
            <Text>Footer</Text>
        </View>
    )
}

export default Footer

const styles = StyleSheet.create({
    footer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        height:50,
        backgroundColor:'blue',
    }
});
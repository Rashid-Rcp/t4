import React from 'react'
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native'

import Profile from './account/Profile'

function Account() {
    return (
        <View style={styles.container}>
            <Profile/>
        </View>
    )
}

export default Account

const styles = StyleSheet.create({
 container:{
        flex:1,
        paddingTop:10,
        backgroundColor:'#fff',
 }
});

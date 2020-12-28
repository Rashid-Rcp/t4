import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity,ScrollView } from 'react-native';

import Profile from './account/Profile';
import Tabs from './account/Tabs';
import Footer from './common/Footer';
import Products from './account/tabs/Products';

function Account() {
    return (
            <View style={styles.container}>
                 <ScrollView>
                    <Profile/>
                    <Tabs/>
                    <Products/>
                </ScrollView>
                <Footer/>
            </View>
    )
}

export default Account

const styles = StyleSheet.create({
 container:{
        paddingTop:10,
        backgroundColor:'#fff',
        flex:1,
 }
});

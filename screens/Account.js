import React,{useState} from 'react';
import { View, Text, StyleSheet,TouchableOpacity,ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import Profile from './account/Profile';
import Tabs from './account/Tabs';
import Footer from './common/Footer';
import Products from './account/tabs/Products';

function Account() {
    
    return (
            <View style={styles.container}>
                 <ScrollView stickyHeaderIndices={[1]}  showsVerticalScrollIndicator={false}>
                    <Profile/>
                    <Tabs/>
                    <Products/>
                </ScrollView>
                <View style={{position: 'absolute', bottom: 50,left:0,right:0, alignItems: 'center'}}>
                    <TouchableOpacity>
                        <Ionicons name="add-circle-outline" style={styles.addIcon} size={50} color="#282828" />
                    </TouchableOpacity>
                </View>
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
 },
 addIcon:{
     backgroundColor:'#f7f7f7',
     borderRadius:100,
 }
});

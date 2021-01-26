import React from 'react';
import { StyleSheet, View, TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons,AntDesign,FontAwesome } from '@expo/vector-icons'; 


function Footer({navigation}) {
    return (
       <View style={styles.footer}>
           <TouchableOpacity onPress={ () => navigation.navigate('Home') }>
            <MaterialCommunityIcons name="store-outline" size={35} color="#282828" />
          </TouchableOpacity>
          <TouchableOpacity onPress={ () => navigation.navigate('Trends') }>
            <MaterialCommunityIcons name="lightning-bolt-outline" size={35} color="#282828" />
          </TouchableOpacity>
          <TouchableOpacity onPress={ () => navigation.navigate('Search') }>
            <AntDesign name="search1" size={35} color="#282828" />
          </TouchableOpacity>
          <TouchableOpacity onPress={ () => navigation.navigate('Holdings') }>
            <FontAwesome name="hand-grab-o" size={35} color="#282828" />
          </TouchableOpacity>
          <TouchableOpacity onPress={ () => navigation.navigate('Offers') }>
            <AntDesign name="gift" size={35} color="#282828" />
          </TouchableOpacity>
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
        backgroundColor:'#fff',
        borderColor:'#dfe1e5',
        borderWidth:1,
    }
});
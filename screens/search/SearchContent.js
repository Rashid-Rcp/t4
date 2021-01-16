import React,{ useState } from 'react'
import { View,Text,TouchableOpacity,StyleSheet,TextInput,ScrollView } from 'react-native'

import ShopResult from './ShopResult';
import ProductResult from './ProductResult';

function SearchContent({navigation}) {

    const [search, setSearch] = useState('');
    return (
        <View style={styles.container}>
           <TextInput
                placeholder={'Search products or shops'}
                style={styles.textBox}
                onChangeText={text => setSearch(text)}
                value={search}
            />
            <ScrollView>
                <ShopResult navigation={navigation}/>
                <View style={styles.divider}></View>
                <ProductResult navigation={navigation}/>
            </ScrollView>
            
        </View>
    )
}

export default SearchContent;

const styles =StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:5,
       
    },
    textBox:{
        marginTop:5,
        borderWidth:.5,
        borderColor:'#ccc',
        paddingHorizontal:10,
        borderRadius:5,
        paddingVertical:2,
    },
    divider:{
        height:1,
        backgroundColor:'#ccc',
        marginTop:10,
    }
});
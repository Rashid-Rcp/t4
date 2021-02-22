import React,{ useState, useContext } from 'react'
import { View,Text,TouchableOpacity,StyleSheet,TextInput,ScrollView } from 'react-native'

import {UserContext} from '../common/UserContext';
import ShopResult from './ShopResult';
import ProductResult from './ProductResult';

function SearchContent({navigation}) {

    const [user, setUser] = useContext(UserContext);
    const [search, setSearch] = useState('');
    return (
        <View style={styles.container}>
           <TextInput
                placeholder={'Search products or shops'}
                style={styles.textBox}
                onChangeText={text => setSearch(text)}
                value={search}
            />
            {
            user.location !== 'no_location' && <ScrollView  showsVerticalScrollIndicator={false}>
                <ShopResult navigation={navigation} search={search} location={user.location}/>
                <View style={styles.divider}></View>
                <ProductResult navigation={navigation} search={search} location={user.location}/>
            </ScrollView>
            }
            {
            user.location === 'no_location' && <Text style={styles.noLocation}>
                Please provide your city/town.
            </Text>
            }
            
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
    },
    noLocation:{
        fontSize:17,
        textAlign:'center',
        marginVertical:30,
        color:"#333333"
    }
});
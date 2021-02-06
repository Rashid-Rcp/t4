import React,{useState,useContext,useEffect} from 'react'
import { StyleSheet, View,Image, TextInput,TouchableOpacity } from 'react-native';
import { EvilIcons, Ionicons } from '@expo/vector-icons'; 

import { UserContext } from './UserContext';

function Header({navigation}) {
    const[user, setUser] = useContext(UserContext);
    const[location, setLocation] = useState(user.location!=='no_location'?user.location:'');
    const locationHandler = ()=>{
        console.log(location);
        let userData = {...user};
        userData.location = location;
        setUser(userData);
    }
    return (
        <View style={styles.header}>
            <View style={styles.headerSec1}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/t4-logo3-1.png')}
                />
                <EvilIcons style={styles.locationIcon} name="location" size={35} color="black" />
                <TextInput value={location} placeholder='Enter your city/town' onBlur={locationHandler} onChangeText={text=>setLocation(text)} />
            </View>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('Account')}>
                    <Ionicons style={styles.chatIcon} name="ios-chatbubble-ellipses-outline" size={20} color="black" />
                    <EvilIcons style={styles.userIcon} name="user" size={40} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
   logo:{width: 50, height:40, resizeMode: 'contain', },
   header:{
        // flex:1,
          alignItems: 'center',
          justifyContent : 'space-between',
          flexDirection:"row",
          paddingHorizontal:10,
          paddingTop:5,
         
   },
   headerSec1:{flexDirection:'row',alignItems:'center'},
   locationIcon:{marginLeft:20, },
   userIcon:{},
   chatIcon:{
        position:'absolute',
        top:0,left:-15,
        transform: [{ rotateY: "180deg" }],
        backgroundColor:'#fca9a9',
        borderRadius:100,
    }
  });

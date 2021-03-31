import React,{useState,useContext,useEffect} from 'react'
import { StyleSheet, View,Image, TextInput, Text, TouchableWithoutFeedback,Platform, UIManager,LayoutAnimation, Linking } from 'react-native';
import { EvilIcons, Ionicons } from '@expo/vector-icons'; 
import * as SecureStore from 'expo-secure-store';
import {TouchableOpacity} from 'react-native-gesture-handler'
import Login from './Login';
import { UserContext } from './UserContext';
import axios from 'axios';


if ( Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

function Header({navigation}) {

    const[user, setUser] = useContext(UserContext);
    const[location, setLocation] = useState(user.location!=='no_location'?user.location:'');
    const [showLogin, setShowLogin] = useState(false);
    const [showSideMenu, setSowSideMenu] = useState(false);
    const [suggestions, setSuggestion] = useState([]);
    
    const locationHandler = ()=>{
        if(location !==''){
            let userData = {...user};
            userData.location = location;
            setUser(userData);
            storeLocationLocally(location);
        }
    }
    const locationSuggestion = (text)=>{
        setLocation(text);
        if(text.length>3){
            axios.get(global.APILink+'/location_suggestion/'+text)
            .then(res=>{
               res.data && setSuggestion(res.data)
            })
            .catch(err=>console.log(err))
        }
        else{
            suggestions.length > 0 && setSuggestion([]); 
        }

    }
    const storeLocationLocally = async(location)=>{
        try {
           await SecureStore.setItemAsync('t4_user_location',location);
            return true;
          } catch (e) {
            console.log(e);
            return false;
          }
    }

    const navigateToAccount = ()=>{
        if(user.id !== '0'){
            navigation.navigate('Account',{accountId:user.id})
        }
        else{
            setShowLogin(true);
        }
    }

    useEffect(() => {
        setLocation(user.location!=='no_location'?user.location:'');
    }, [user])

    return (
        <>
        <View style={styles.header}>
            <View style={styles.headerSec1}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/showi-logo-2.png')}
                />
                <EvilIcons style={styles.locationIcon} name="location" size={35} color="black" />
                <TextInput style={{textTransform:'capitalize'}} value={location} placeholder='Enter your city/town' onBlur={locationHandler} onChangeText={text=>locationSuggestion(text)} />

            </View>
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity onPress={() => navigateToAccount()}>
                    <EvilIcons style={styles.userIcon} name="user" size={40} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);setSowSideMenu(!showSideMenu)}} >
                    <Ionicons name="menu-outline" size={30} color="black" />
                </TouchableOpacity>
            </View>
        </View>
        
         {
         showLogin && <Login setShowLogin={setShowLogin} navigation={navigation} />
        }
        {
        showSideMenu && <View style={styles.sideMenu}>
            <View style={styles.sideMenuContent}>
                <TouchableOpacity onPress={()=>navigation.navigate('PrivacyPolicy')}>
                    <Text style={styles.sideMenuItem}>Privacy Policy</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('TermsConditions')}>
                <Text style={styles.sideMenuItem}>Terms & Conditions</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> Linking.openURL(global.serverPublic+'/contact')}>
                    <Text style={styles.sideMenuItem}>Help</Text>
                </TouchableOpacity>
            </View>
            <TouchableWithoutFeedback onPress={()=> {LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); setSowSideMenu(false)}}>
                <View style={styles.menuOverLay}></View>
            </TouchableWithoutFeedback>
        </View>
        }
        {
            suggestions.length>0 && <View style={styles.locationSuggestion}>
            <View style={styles.suggestionHolder}>
                {
                    suggestions.map((item, index)=>{
                        return (
                            <TouchableOpacity key={index} onPress={()=>{setSuggestion([]);setLocation(item);}}>
                                <Text style={styles.suggestionItems}>{item}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
               
            </View>
        </View>
        }
        </>
    )
}

export default Header;

const styles = StyleSheet.create({
   logo:{width: 70, height:30, resizeMode: 'contain'},
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
    },
    sideMenu:{
        position:'absolute',
        width:'100%',
        right:0,
        top:46,
        height:'100%',
        zIndex:99,
    },
    sideMenuContent:{
        zIndex:999,
        width:'50%',
        right:0,
        position:'absolute',
        height:'100%',
        backgroundColor:'#f7f7f7',
        paddingTop:20,
        paddingLeft:10,
    },
    menuOverLay:{
        width:'100%',
        height:'100%',
        position:'absolute',
        backgroundColor:'#333333',
        opacity:.5,
    },
    sideMenuItem:{
        marginBottom:10,
    },
    locationSuggestion:{
        position:'relative',
        zIndex:9,
    },
    suggestionHolder:{
        position:'absolute',
        paddingBottom:20,
        paddingTop:10,
        width:'100%',
        backgroundColor:'#f7f7f7',
        top:1,
        zIndex:1,
    },
    suggestionItems:{
        textAlign:'center',
        marginVertical:5,
        textTransform:'capitalize',
    }
    
  });

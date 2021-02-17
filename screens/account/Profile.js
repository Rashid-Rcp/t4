import React,{useState, useEffect,useContext } from 'react'
import { View, Text, StyleSheet, Image,TouchableOpacity,Platform, UIManager, LayoutAnimation,Alert,TouchableWithoutFeedback } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

import {UserContext} from '../common/UserContext';
import ComponentLoader from '../common/ComponentLoader';
import {ActiveTabContext} from './tabs/ActiveTabContext';

if ( Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

function Profile({navigation, refreshing, endRefresh}) {
    const [isLoading, setIsLoading] = useState(true);
    const [isDPLoading, setIsDPLoading] = useState(true);
    const [user, setUser] = useContext(UserContext);
    const [userDetails, setUserDetails] = useState({
        "address": "",
        "email": "",
        "image": "",
        "location": "",
        "name": "",
        "phone": "",
        "type": "",
    });

    const [activeTab, setActiveTab] = useContext(ActiveTabContext)
    const [showEditLinks, setShowEditLinks] = useState(false);
    const [showContact, setShowContact] = useState(false);
    const [DPChanged, setDPChanged] = useState(false);
    const [itemFound, setItemFound] = useState(true);
    //const [imageDP, setImageDP] = useState('https://picsum.photos/200');

    useEffect(() => {
       if(user.id !== '0' && refreshing){
        axios.get(global.APILink+'/user/'+user.id)
        .then(res =>{
            if(res.data.status === 'not_found'){
               setItemFound(false);
            }
            else{
                res.data && setUserDetails(res.data);
            }
            res.data && setIsLoading(false);
            endRefresh();
            
        })
        .catch(err =>console.log(err))
       }
       
    }, [user,refreshing])

    useEffect(() => {
        userDetails.type ==='customer' && setActiveTab('none');
        (userDetails.type === 'retailer' && activeTab === 'none') && setActiveTab('Product')

    }, [userDetails])

    useEffect(() => {
            (async () => {
                if (Platform.OS !== 'web') {
                  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                  if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                  }
                }
              })();
    },[]);



    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1,1],
          quality: .5,
        });
      
        if (!result.cancelled) {
         // update user image to db
            setIsDPLoading(true);
            let formData = new FormData();
            let uriParts = result.uri.split('.');
            let fileType = uriParts[uriParts.length - 1];
            formData.append('photo', {
                uri:result.uri,
                name: `photo.${fileType}`,
                type: `image/${fileType}`,
            });
            formData.append('user_id',user.id);
            axios.post(global.APILink+'/user/dpupdate',formData)
            .then(res=>{
                setIsDPLoading(false)
                if(res.data.status === 'success'){
                    setDPChanged(result.uri);
                }
                else{ 
                    Alert.alert(
                    "Error",
                    res.data.message,
                    [
                      { text: "OK"}
                    ],
                    { cancelable: false }
                  );
                }
            })
            .catch(err=>console.log(err));
          
        }
      }

      const deleteUserAccount = ()=>{

      }

      const logoutUserAccount = ()=>{
          //delete secure store
          SecureStore.deleteItemAsync('t4_user_id');
          let userData = {...user};
          userData.id='0';
          setUser(userData);
          //navigation.navigate('Account');
          
      }

      if(isLoading){
          return ( <View></View>
              //<ComponentLoader height={130}/>
          )
      }
      else if (!itemFound){
          return (
            <View style={{flex:1}}>
                <Text style={styles.notFound}>Not Found</Text>
            </View>
          )
      }
      else{
        return (
            <>
           <View style={styles.container}>
               <View style={{width:155}}>
                   <View style={styles.DPHolder}>
                    <Image 
                        style={styles.DP}
                        source={{uri:DPChanged ? DPChanged : global.serverPublic+'/images/'+userDetails.image }}
                        onLoad={()=>{setIsDPLoading(false)}}/>
                        {
                        !isDPLoading && <TouchableOpacity style={styles.cameraHolder} onPress={pickImage}>
                            <MaterialCommunityIcons style={styles.camera} name="camera" size={30} color="#282828" />
                        </TouchableOpacity>
                        }
                        {
                            isDPLoading && <ComponentLoader height={5}/>
                        }
                   </View>
                   {userDetails.type === 'retailer' &&
                    <TouchableOpacity onPress={()=>{
                        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                        setShowContact(!showContact);
                        }}>
                    <Text style={styles.contactLink}>{showContact?'Hide' : 'View'} contact details</Text> 
                    </TouchableOpacity>
                   }
               </View>
               <View>
                   <View style={styles.details}>
                       <Text style={styles.shopName}>{userDetails.name}</Text>
                       <Text style={styles.location}>{userDetails.location}</Text>
                       {
                       userDetails.type === 'retailer' && userDetails.followers > 0 &&  <Text style={styles.followers}>Followers {userDetails.followers}</Text>
                       }
                   </View>
               </View>
               <View style={[styles.actionBtn,showEditLinks?styles.actionBtnActive:'']}>
                    <View>
                        <TouchableOpacity onPress={()=>{ LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);setShowEditLinks(!showEditLinks)}}>
                            <MaterialCommunityIcons  name="dots-vertical" size={30} color="#282828" />
                        </TouchableOpacity>
                    </View>
                    { showEditLinks && <View style={styles.editLink}>
                            <TouchableOpacity onPress={()=>{setShowEditLinks(!showEditLinks); navigation.navigate('EditProfile')}}>
                                <Text style={{fontSize:16}}>Edit Profile</Text>
                            </TouchableOpacity>
                      </View>
                    }  
                    { showEditLinks && <View style={styles.editLink}>
                            <TouchableOpacity onPress={()=>{setShowEditLinks(!showEditLinks); navigation.navigate('EditContact')}}>
                                <Text style={{fontSize:16}}>Edit Contact</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    { showEditLinks && <View style={styles.editLink}>
                            <TouchableOpacity onPress={()=>{setShowEditLinks(!showEditLinks); logoutUserAccount()}}>
                                <Text style={{fontSize:16}}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    { showEditLinks && <View style={styles.editLink}>
                            <TouchableOpacity onPress={()=>{setShowEditLinks(!showEditLinks); deleteUserAccount()}}>
                                <Text style={{fontSize:16}}>Delete Account</Text>
                            </TouchableOpacity>
                        </View>
                    }
               </View>
           </View>
           {
              ( showContact || userDetails.type === 'customer') && <View style={styles.contactDetails}>
               <Text style={styles.contactTitle}>
                   Address : <Text style={styles.contactContent}>{userDetails.address}</Text>
               </Text>  
               <Text style={styles.contactTitle}>Phone : <Text style={styles.contactContent}>{userDetails.phone}</Text></Text>  
               <Text style={styles.contactTitle}>Email : <Text style={styles.contactContent}>{userDetails.email}</Text></Text>
            </View>
           }
           
           </>
        )
      }

    
}

export default Profile

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'flex-start',
        paddingHorizontal:10,
        marginBottom:30,
    },
    DPHolder:{
        position:'relative',
        width:120,
    },
    DP:{
        width:120,
        height:120,
        borderRadius:100,
        resizeMode: 'contain',
    },
    camera:{
        backgroundColor:'#f7f7f7',
        borderRadius:100
    },
    cameraHolder:{
        position:'absolute',
        right:5,
        bottom:15,
    },
    details:{
        paddingTop:10,
        marginLeft:-13,

    },
    actionBtn:{
        flex:1,
        alignItems:'flex-end',
        padding:0,
        margin:0,
    },
    actionBtnActive:{
        backgroundColor:'#f8f8f8',
        borderRadius:5,
        borderColor:'#ccc',
        borderWidth:.5,
    },
    shopName:{
        fontSize:19,
        fontWeight:'700',
    },
    location:{
        marginTop:5,
        fontSize:17,
        textTransform:'capitalize',
    },
    followers:{
        marginTop:20,
        fontSize:17,
    },
    contactLink:{
        fontSize:17,
        marginTop:10,
    },
    editLink:{
        marginVertical:5,
        backgroundColor:'#f8f8f8',
        paddingHorizontal:10,
        paddingVertical:5,
        flexWrap:'nowrap',
        flexDirection:'row-reverse',
    },
    contactDetails:{
        paddingHorizontal:10,
        marginTop:-20,
        paddingBottom:20,
    },
    contactTitle:{
        fontSize:16,
        marginBottom:5,
        lineHeight:25,
        fontWeight:'700',
    },
    contactContent:{
        fontSize:15,
        fontWeight:'normal',
    },
    notFound:{
        paddingVertical:50,
        paddingHorizontal:10,
        textAlign:'center',
        fontSize:17,
    }
   

});
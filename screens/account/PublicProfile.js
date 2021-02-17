import React,{useState, useEffect,useContext } from 'react'
import { View, Text, StyleSheet, Image,TouchableOpacity,Platform, UIManager, LayoutAnimation,Alert,TouchableWithoutFeedback } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import axios from 'axios';

import {UserContext} from '../common/UserContext';
import ComponentLoader from '../common/ComponentLoader';
import {ActiveTabContext} from './tabs/ActiveTabContext';
import Login from '../common/Login';
import abbreviateNumber from '../common/abbreviateNumber';


if ( Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

function PublicProfile({navigation, refreshing, endRefresh, accountId}) {
    const [isLoading, setIsLoading] = useState(true);
    const [isDPLoading, setIsDPLoading] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followers, setFollowers] = useState(0);
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
    const [showContact, setShowContact] = useState(false);
    const [itemFound, setItemFound] = useState(true);
    const [isLogin, setIsLogin] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    useEffect(()=>{
        user.id !== '0' && setIsLogin(true);
    },[user])
    
    useEffect(() => {
        let mounted = true;
        if(refreshing){
            axios.get(global.APILink+'/public_profile/'+accountId+'/'+user.id)
            .then(res =>{
                if(mounted){
                    if(res.data.status === 'not_found'){
                        setItemFound(false);
                    }
                    else{
                        res.data && setUserDetails(res.data);
                        res.data && setFollowers(res.data.followers);
                        res.data && setIsFollowing(res.data.isFollow);
                    }
                    res.data && setIsLoading(false);
                    endRefresh();
                }
               
            })
            .catch(err =>console.log(err))
        }
        return () => mounted = false;
       
    }, [user,refreshing]) 

    const handleUnFollow = ()=>{
        if(isLogin){
            setFollowers(followers-1);
            setIsFollowing(false);
            axios.post(global.APILink+'/follow',{follower:user.id,following:accountId,action:'unFollow'})
            .then(res=>{
                res.data.status !== 'success' && setFollowers(followers);
                res.data.status !== 'success' && setIsFollowing(true);
            })
            .catch(err=>console.log(err))
        }
        else{
            setShowLogin(true);
        }
        
    }

    const handleFollow = ()=>{
        if(isLogin){
            setFollowers(followers+1);
            setIsFollowing(true)
            axios.post(global.APILink+'/follow',{follower:user.id,following:accountId,action:'follow'})
            .then(res=>{
                res.data.status !== 'success' && setFollowers(followers);
                res.data.status !== 'success' && setIsFollowing(false);
            })
            .catch(err=>console.log(err))
        }
        else{
            setShowLogin(true);
        }
        
    }

    useEffect(() => {
        userDetails.type ==='customer' && setActiveTab('none');
        userDetails.type === 'retailer' && activeTab === 'none' && setActiveTab('Product')
    }, [userDetails]) 

      if(isLoading){
          return ( 
              <View></View>
             // <ComponentLoader height={130}/>
          )
      }
      else if(!itemFound){
          return ( <View style={{flex:1}}>
              <Text style={styles.notFound}>Not Found</Text>
          </View>)
      }
      else{
        return (
            <>
           <View style={styles.container}>
               <View style={{width:155}}>
                   <View style={styles.DPHolder}>
                    <Image 
                        style={styles.DP}
                        source={{uri: global.serverPublic+'/images/'+userDetails.image }}
                        onLoad={()=>{setIsDPLoading(false)}}/>
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
                       userDetails.type === 'retailer' && userDetails.followers > 0 && <View style={styles.follow}> 
                           <Text style={styles.followers}>Followers {abbreviateNumber(followers)}</Text>
                            {
                             isFollowing &&  <TouchableWithoutFeedback onPress={handleUnFollow}>
                                <MaterialCommunityIcons  style={styles.followButton} name="heart" size={30} color="#ff0038"  />
                            </TouchableWithoutFeedback>
                            }
                            {
                            !isFollowing && <TouchableWithoutFeedback onPress={handleFollow}>
                                <MaterialCommunityIcons style={styles.followButton} name="heart-outline" size={30} color="#282828" />
                            </TouchableWithoutFeedback>
                            }
                           
                        </View>
                       }
                        
                   </View>
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
           {
            showLogin && <Login navigation={navigation} setShowLogin={setShowLogin} />
           }
           </>
        )
      }
}

export default PublicProfile

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
    follow:{
        flex:1,
        flexDirection:'row',
        marginTop:10,
        alignItems:'center'
    },
    followButton:{
        marginLeft:20,
    },
    notFound:{
        paddingVertical:50,
        paddingHorizontal:10,
        textAlign:'center',
        fontSize:17,
    }
   
   

});
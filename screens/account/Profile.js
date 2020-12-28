import React from 'react'
import { View, Text, StyleSheet, Image,TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 


function Profile() {
    return (
       <View style={styles.container}>
           <View>
               <View style={styles.DPHolder}>
                <Image 
                    style={styles.DP}
                    source={{uri: 'https://picsum.photos/200'}}/>
                    <TouchableOpacity style={styles.cameraHolder} onPress={()=>{console.log('okok')}}>
                        <MaterialCommunityIcons style={styles.camera} name="camera" size={30} color="#282828" />
                    </TouchableOpacity>
               </View>
               <TouchableOpacity>
                <Text style={styles.contactLink}>View contact details</Text>   
               </TouchableOpacity>
            
           </View>
           <View>
               <View style={styles.details}>
                   <Text style={styles.shopName}>Shop Name</Text>
                   <Text style={styles.location}>Location</Text>
                   <Text style={styles.followers}>Followers 100</Text>
               </View>
           </View>
           <View style={styles.actionBtn}>
                <MaterialCommunityIcons name="dots-vertical" size={30} color="#282828" />
           </View>
       </View>
    )
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
        width:130,
    },
    DP:{
        width:130,
        height:130,
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
        paddingLeft:0,

    },
    actionBtn:{
        
        position:'absolute',
        right:7,
       
    },
    shopName:{
        fontSize:19,
        fontWeight:'700',

    },
    location:{
        marginTop:5,
        fontSize:17,
    },
    followers:{
        marginTop:20,
        fontSize:17,
    },
    contactLink:{
        fontSize:17,
        marginTop:10,
    },
   
   

});
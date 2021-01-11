import React,{useState, useEffect} from 'react'
import { View, Text, StyleSheet, Image,TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';



function Profile() {
    const [showEditLinks, setShowEditLinks] = useState(false);
    const [imageDP, setImageDP] = useState('https://picsum.photos/200');

    useEffect(() => {
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1,1],
          quality: .5,
        });
      

        if (!result.cancelled) {
          setImageDP(result.uri);
        }
      };

    return (
       <View style={styles.container}>
           <View>
               <View style={styles.DPHolder}>
                <Image 
                    style={styles.DP}
                    source={{uri:imageDP }}/>
                    <TouchableOpacity style={styles.cameraHolder} onPress={pickImage}>
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
           <View style={[styles.actionBtn,showEditLinks?styles.actionBtnActive:'']}>
               <View>
                    <TouchableOpacity onPress={()=>{setShowEditLinks(!showEditLinks)}}>
                        <MaterialCommunityIcons  name="dots-vertical" size={30} color="#282828" />
                    </TouchableOpacity>
               </View>
               
               { showEditLinks && 
                    <View style={styles.editLink}><Text style={{fontSize:16}}>Edit Profile</Text></View>
                }  
                { showEditLinks && 
                    <View style={styles.editLink}><Text style={{fontSize:16}}>Edit Contact</Text></View>
                }
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
    }
   
   

});
import React, { useState, useEffect,useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView,TextInput,Button,KeyboardAvoidingView,ActivityIndicator  } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { showMessage, hideMessage } from "react-native-flash-message";

import {UserContext} from '../../common/UserContext'
import Footer from '../../common/Footer';

function AddNewOffer({navigation}) {
    const [user, setUser] = useContext(UserContext);
    const [offerImage,setOfferImage] = useState('');
    const [offerTitle, setOfferTitle] = useState('');
    const [offerDescription, setOfferDescription] = useState('');
    const [offerTags, setOfferTags] = useState('');
    const [validation, setValidation] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);


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
          aspect: [4,5],
          quality: .4,
        });
        if (!result.cancelled) {
            setOfferImage(result.uri);
        }

      };

      const showFlashMessage = (type, message) => {
        showMessage({
            title: "Add new offer",
            message: message,
            type: type
        })
    }

      const submitOffer =()=>{
        let valid = doValidation();
        if(valid){
            setIsSubmitting(true);
            let formData = new FormData();
            let uriParts = offerImage.split('.');
            let fileType = uriParts[uriParts.length - 1];
            formData.append('offersImages[]', {
                uri:offerImage,
                name: `photo.${fileType}`,
                type: `image/${fileType}`,
            });
            formData.append('title',offerTitle);
            formData.append('tags',offerTags);
            formData.append('description',offerDescription);
            formData.append('user_id',user.id);
            axios.post(global.APILink+'/offers',formData)
            .then(res=>{
               
                setIsSubmitting(false);
                if(res.data.status === 'success' ){
                    showFlashMessage('success','Offer addded successfully!');
                    setOfferImage('');
                    setOfferTitle('');
                    setOfferTags('');
                    setOfferDescription('')
                }
                else{
                    showFlashMessage('danger','An error occurred, please try again later');
                }
            })
            .catch(err=>console.log(err))
        }
      }

      const doValidation = ()=>{
        let error = [];
        offerImage.length === 0 && error.push('Offer image required');
        offerTitle === '' && error.push('Offer title required');
        offerTags === '' && error.push('Offer tags required');
        offerDescription === '' && error.push('Offer description required');
        offerTitle !== '' && offerTitle.length >50 && error.push('Offer title exceeded 50 characters');
        offerDescription !== '' && offerDescription.length >200 && error.push('Offer description exceeded 200 characters');

      setValidation(error);
        if(error.length === 0){
          return true;
        }
        else{
          return false;
        }
       
    }

    return (
       <View style={styles.container}>
            <KeyboardAvoidingView style={styles.keyboardView}
         behavior="padding" enabled   keyboardVerticalOffset={60}>
           <ScrollView>
               <View style={styles.imageHolder}>
                   {
                       offerImage !== '' && <View style={{width:90,marginTop:10,}}>
                            <Image style={styles.selectedImage} source={{uri:offerImage }}/>
                        </View>
                   }
                   {
                     offerImage === '' && <View style={{width:50,marginTop:10,}}>
                        <Entypo name="image" size={50} color="#333333" />
                     </View>   
                   }
                    <View style={styles.addBtn}>
                        <TouchableOpacity onPress={pickImage}>
                            <Ionicons name="add-circle-outline" size={40} color="#282828" />
                        </TouchableOpacity>
                    </View>
               </View>
               <View style={styles.offerDetails}>
                   <Text style={styles.heading}>Title</Text>
                   <TextInput
                        style={styles.textBox}
                        onChangeText={text => setOfferTitle(text)}
                        value={offerTitle}
                    />
                    <Text style={styles.helperText}> 50 Characters available. </Text>

                    <Text style={styles.heading}>Tags <Text style={styles.helperText}>(eg: for men, for ladies, offer for shirt)</Text></Text>
                        <TextInput multiline  numberOfLines={10}
                            style={styles.textArea}
                            onChangeText={text => setOfferTags(text)}
                            value={offerTags}
                            />
                    <Text style={styles.helperText}> separate your tags by comma. </Text>

                    <Text style={styles.heading}>Description</Text>
                    <TextInput multiline  numberOfLines={10}
                            style={styles.textArea}
                            onChangeText={text => setOfferDescription(text)}
                            value={offerDescription}
                            />
                        <Text style={styles.helperText}> 200 Characters available. </Text>

               </View>
               {
                   validation.map((item,index)=>(
                       <Text key={index} style={styles.validation}>{item}</Text>
                   ))
               }
               <View style={styles.submitBtnHolder}>
                    <View style={{flex:1,}}>
                        <Button style={styles.submitBtn}
                        title={isSubmitting?"Submitting...":"Add Offer"}
                        color="#282828"
                        onPress={submitOffer}
                        disabled={isSubmitting?true:false}
                        />
                    </View>
                </View>
           </ScrollView>
           {
               isSubmitting && <><View style={styles.loadingScreen}>
               </View>
               <View style={styles.loadingIndicator}>
               <ActivityIndicator size="small" color="#0a2351"  />
               </View>
               </>
           }
           </KeyboardAvoidingView>
           <Footer navigation={navigation}/>
       </View>
    )
}

export default AddNewOffer;

const styles =StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:10,
    },
    selectedImage:{
        width:'100%',
        height:100,
        resizeMode:'contain',
     },
     
    addBtn:{
        padding:10,
        flex:1,
     },
     imageHolder:{
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    helperText:{
        fontSize:10,
        paddingVertical:3,
    },
    textBox:{
        height: 30, borderColor: 'gray', borderWidth: 1 ,
        marginTop:7,
        borderRadius:5,
        paddingHorizontal:5,
        flex:1,
   },
   textArea:{
       height: 60, borderColor: 'gray', borderWidth: 1 ,
       marginTop:7,
       borderRadius:5,
       paddingHorizontal:5,
       paddingVertical:5,
       textAlignVertical:'top',
   },
   heading:{
       marginTop:15,
   },
   
   submitBtn:{
    flex:1,
    width:'80%',
    marginTop:100,
    borderRadius:5,
},
submitBtnHolder:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    marginVertical:30,
},
keyboardView:{ flex: 1, flexDirection: 'column',justifyContent: 'center',},
validation:{
    color:'red',
    marginVertical:5,
},
loadingScreen:{
    flex:1,
    position:'absolute',
    width:'100%',
    height:'100%',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#333333',
    opacity:.3,
},
loadingIndicator:{
    position:'absolute',
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    width:'100%',
}

});

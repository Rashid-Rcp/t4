import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView,TextInput,Button,KeyboardAvoidingView  } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';

import Footer from '../../common/Footer';

function AddNewOffer() {
    const [offerImage,setOfferImage] = useState(false);
    const [offerTitle, setOfferTitle] = useState('');
    const [offerDescription, setOfferDescription] = useState('');
    const [offerTags, setOfferTags] = useState('');


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
          quality: .5,
        });
        if (!result.cancelled) {
            setOfferImage(result.uri);
        }

      };

      const submitOffer =()=>{

      }

    return (
       <View style={styles.container}>
            <KeyboardAvoidingView style={styles.keyboardView}
         behavior="padding" enabled   keyboardVerticalOffset={60}>
           <ScrollView>
               <View style={styles.imageHolder}>
                   {
                       offerImage && <View style={{width:90,marginTop:10,}}>
                            <Image style={styles.selectedImage} source={{uri:offerImage }}/>
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
                    <Text style={styles.helperText}> 50 Characters left. </Text>

                    <Text style={styles.heading}>Tags</Text>
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
                        <Text style={styles.helperText}> 400 Characters left. </Text>

               </View>
               <View style={styles.submitBtnHolder}>
                    <View style={{flex:1,}}>
                        <Button style={styles.submitBtn}
                        title="Add Offer"
                        color="#282828"
                        onPress={submitOffer}
                    />
                    </View>
                
                </View>
           </ScrollView>
           </KeyboardAvoidingView>
           <Footer/>
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
});

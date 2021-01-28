import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView,TextInput,Button,KeyboardAvoidingView  } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { showMessage, hideMessage } from "react-native-flash-message";

import Footer from '../../common/Footer';
import {UserContext} from '../../common/UserContext'

function AddNewProduct({navigation}) {
    const [user, setUser] = useContext(UserContext);
    const [selectedImages, setSelectedImages] = useState([]);
    const [productTitle, setProductTitle] = useState('');
    const [productType, setProductType] = useState('');
    const [productTags, setProductTags] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [variationTitle, setVariationTitle] = useState('');
    const [variationItem, setVariationItem] = useState({});
    const [variationItemTitle,setVariationItemTitle] = useState('');
    const [variationItemPrice,setVariationItemPrice] = useState('');
    const [validation, setValidation] = useState([]);
    const [addVariationValidation, setAddVariationValidation] = useState([]);
    const [isProductSubmitting, setIsProductSubmitting] = useState(false);

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
            setSelectedImages(selectedImages => [...selectedImages, result.uri]);
        }

      };
      
      const addVariation = ()=>{
          let error = [];
          variationItemTitle === '' && error.push('Variation title required');
          variationItemPrice === '' && error.push('Variation price required');
          variationItemTitle !== '' && variationItemTitle.length >20 && error.push('Variation title exceeded 20 characters');
          variationItemPrice !== '' && (isNaN(variationItemPrice) || variationItemPrice.length > 10) && error.push('Variation price is invalid');
          setAddVariationValidation(error);
          if(error.length===0){
            let newItem = {[variationItemTitle]:variationItemPrice}
            setVariationItem({...variationItem,...newItem});
            setVariationItemTitle('');
            setVariationItemPrice('');
        }
      }

      const submitProduct =()=>{
       
        let valid = doValidation();
        if(valid){
            setIsProductSubmitting(true);
            let formData = new FormData();
            selectedImages.forEach(file=>{
                let uriParts = file.split('.');
                let fileType = uriParts[uriParts.length - 1];
                formData.append('productImages[]', {
                    uri:file,
                    name: `photo.${fileType}`,
                    type: `image/${fileType}`,
                });
            });
            formData.append('title',productTitle);
            formData.append('type',productType);
            formData.append('tags',productTags);
            formData.append('price',Number(productPrice));
            formData.append('description',productDescription);
            if(variationTitle !== ''){
                let variation = new Object();
                variation[variationTitle] = variationItem;
                formData.append('variation',JSON.stringify(variation));
            }
            else{
                formData.append('variation','{}');
            }
            formData.append('user_id',user.id);
            axios.post(global.APILink+'/products',formData)
            .then(res=>{
               setIsProductSubmitting(false);
                if(res.data.status === 'success'){
                    showFlashMessage('success','products addded successfully!');
                    resetForm();
                }
                else{
                    showFlashMessage('danger','An error occurred please try again later!');
                }
                
            })
            .catch(err=>console.log(err));
        }
      }

      const doValidation = ()=>{
          let error = [];
          selectedImages.length === 0 && error.push('Product images required');
          productTitle === '' && error.push('Product title required');
          productTags === '' && error.push('Product tags required');
          productPrice === '' && error.push('Product Price required');
          productDescription === '' && error.push('Product description required');
          if(variationTitle !== '' && (Object.keys(variationItem).length === 0 && variationItem.constructor === Object)){
            error.push('Product variation required');
          }
          if(variationTitle === '' && (Object.keys(variationItem).length !== 0 )){
            error.push('Product variation type required');
          }
          productTitle !== '' && productTitle.length >50 && error.push('Product title exceeded 50 characters');
          productType !== '' && productType.length >20 && error.push('Product type exceeded 20 characters');
          productDescription !== '' && productDescription.length >200 && error.push('Product description exceeded 200 characters');
          productPrice!== '' && (isNaN(productPrice) || productPrice.length >10) && error.push('Product price is invalid');
          variationTitle !== '' && variationTitle.length >20 && error.push('Variation type is invalid');

        setValidation(error);
          if(error.length === 0){
            return true;
          }
          else{
            return false;
          }
         
      }
    const showFlashMessage = (type, message) => {
        showMessage({
            title: "Add new product",
            message: message,
            type: type
        })
    }

    const resetForm = ()=>{
       setSelectedImages([]);
       setProductTitle('');
       setProductType('');
       setProductTags('');
       setProductPrice('');
       setProductDescription('');
       setVariationTitle('');
       setVariationItem({});
    }

    return (
       <View style={styles.container}>
        <KeyboardAvoidingView style={styles.keyboardView}
         behavior="padding" enabled   keyboardVerticalOffset={60}>
           <ScrollView>
               <View style={styles.imageHolder}>
               {
                    selectedImages.map((image, index)=>{
                    return ( 
                        <View key={index} style={styles.imageItem}>
                            <Image style={styles.selectedImage} source={{uri:image }}/>
                        </View>
                    )
                    })
                }
                {
                selectedImages.length === 0 && <View style={{flexDirection:'column',padding:10}}><Entypo name="images" size={50} color="black" />
                <Text>Images</Text></View>
                }
                { selectedImages.length < 4 && 
                    <View style={styles.addBtn}>
                        <TouchableOpacity onPress={pickImage}>
                            <Ionicons name="add-circle-outline" size={40} color="#282828" />
                        </TouchableOpacity>
                    </View>
                }
               </View>
               {
                selectedImages.length > 0 && 
                <View style={styles.clearImage}>
                    <TouchableOpacity onPress={()=>{setSelectedImages([])}}>
                        <Text>Clear Images</Text>
                    </TouchableOpacity>
                </View>
                }
                <View style={styles.productDetailsHolder}>
                    <View style={styles.productDetailsGroup}>
                        <Text>Title</Text>
                        <TextInput
                            style={styles.textBox}
                            onChangeText={text => setProductTitle(text)}
                            value={productTitle}
                            />
                            <Text style={styles.helperText}> 50 Characters allowed. </Text>
                    </View>
                    <View style={styles.productDetailsGroup}>
                        <Text>Type</Text>
                        <TextInput
                            style={styles.textBox}
                            onChangeText={text => setProductType(text)}
                            value={productType}
                            />
                            <Text style={styles.helperText}> 20 Characters allowed. </Text>
                    </View>
                    <View style={styles.productDetailsGroup}>
                        <Text>Tags</Text>
                        <TextInput multiline  numberOfLines={10}
                            style={styles.textArea}
                            onChangeText={text => setProductTags(text)}
                            value={productTags}
                            />
                        <Text style={styles.helperText}> separate your tags by comma. </Text>
                    </View>
                    <View style={styles.productDetailsGroup}>
                        <Text>Price</Text>
                        <TextInput
                            style={styles.textBox}
                            onChangeText={text => setProductPrice(text)}
                            value={productPrice}
                            />
                    </View>
                    <View style={styles.productDetailsGroup}>
                        <Text>Description</Text>
                        <TextInput multiline  numberOfLines={10}
                            style={styles.textArea}
                            onChangeText={text => setProductDescription(text)}
                            value={productDescription}
                            />
                        <Text style={styles.helperText}> 200 Characters allowed. </Text>
                    </View>

                    <View style={styles.productDetailsGroup}>
                        <Text style={{fontSize:16,marginBottom:10,}}>Variation (optional)</Text>
                        <Text>Variation Type  <Text style={styles.helperText}> (e.g Size) </Text></Text>
                        <TextInput
                            style={styles.textBox}
                            onChangeText={text => setVariationTitle(text)}
                            value={variationTitle}
                            />
                        <View style={styles.variations}>
                           <View style={styles.variationHeading}> 
                                 <Text style={styles.variationHeadingText}>Title</Text> 
                                 <Text style={styles.variationHeadingText}>Price</Text>
                            </View> 
                            {
                               variationItem &&  Object.keys(variationItem).map((item, index) => (
                                <View key={index} style={styles.variationItems}>
                                    <Text style={styles.variationItemsText}>{item}</Text>
                                    <Text style={styles.variationItemsText}>{variationItem[item]}</Text>
                                </View>
                                ))
                            }
                            {
                                Object.keys(variationItem).length !== 0 && 
                                <View style={styles.clearVariation}>
                                    <TouchableOpacity onPress={()=>{setVariationItem({})}}>
                                        <Text>Clear all</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                            <View style={styles.variationItems}>
                                <TextInput
                                    style={[styles.textBox,styles.variationTextBox]}
                                    onChangeText={text => setVariationItemTitle(text)}
                                    value={variationItemTitle}
                                    />
                                <TextInput
                                    style={[styles.textBox,styles.variationTextBox]}
                                    onChangeText={text => setVariationItemPrice(text)}
                                    value={variationItemPrice}
                                    />
                            </View>
                            {
                                addVariationValidation.map((error,index)=>
                                <Text key={index} style={styles.validation}>{error}</Text>
                                )
                            }
                            <View style={styles.addBtnVariation}>
                                <TouchableOpacity onPress={addVariation}>
                                    <Ionicons name="add-circle-outline" size={30} color="#282828" />
                                </TouchableOpacity>
                            </View>
                        </View>
                       
                    </View>
                        {
                           validation.map((error,index) => 
                            <Text style={styles.validation} key={index}>{error}</Text>
                           )
                        }

                    <View style={styles.submitBtnHolder}>
                        <View style={{flex:1,}}>
                            <Button style={styles.submitBtn}
                            title={isProductSubmitting?'Submitting...':"Add Product"}
                            color="#282828"
                            disabled ={isProductSubmitting?true:false}
                            onPress={submitProduct}
                        />
                        </View>
                    </View>
                </View>
           </ScrollView>
           </KeyboardAvoidingView>
           <Footer navigation={navigation}/>
       </View>
    )
}

export default AddNewProduct;

const styles =StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
    },
    imageHolder:{
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'center',
        
    },
    addBtn:{
       padding:10,
    },
    selectedImage:{
       width:'100%',
       height:100,
       resizeMode:'contain',
    },
    imageItem:{
        margin:5,
        width:'20%',
    },
    clearImage:{
        paddingHorizontal:20,
        paddingVertical:10,
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
    productDetailsHolder:{
        paddingHorizontal:10,
    },
    helperText:{
        fontSize:10,
        paddingVertical:3,
    },
    productDetailsGroup:{
        marginBottom:15,
    },
    variationHeading:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:10,
    },
    variationHeadingText:{
        fontSize:15,
        paddingHorizontal:10,
    },
    variationItems:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    variationItemsText:{
        paddingHorizontal:10,
    },
    variationTextBox:{
        marginHorizontal:2,
    },
    addBtnVariation:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        marginTop:10,
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
        marginBottom:30,
        justifyContent:'center',
    },
    clearVariation:{
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-end',
        paddingHorizontal:10,
        paddingVertical:5,
    },
    keyboardView:{ flex: 1, flexDirection: 'column',justifyContent: 'center',},
    validation:{
        color:'red',
        paddingBottom:5,
    }
    

});

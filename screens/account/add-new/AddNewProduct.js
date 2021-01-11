import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView,TextInput,Button  } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';

import Footer from '../../common/Footer';

function AddNewProduct() {
    const [selectedImages, setSelectedImages] = useState([]);
    const [productTitle, setProductTitle] = useState('');
    const [productTags, setProductTags] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [variationTitle, setVariationTitle] = useState('');
    const [variationItem, setVariationItem] = useState({});
    const [variationItemTitle,setVariationItemTitle] = useState('');
    const [variationItemPrice,setVariationItemPrice] = useState('');

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
        if(variationItemTitle && variationItemPrice){
            let newItem = {[variationItemTitle]:variationItemPrice}
            setVariationItem({...variationItem,...newItem});
            setVariationItemTitle('');
            setVariationItemPrice('');
        }
      }

      const submitProduct =()=>{

      }

    return (
       <View style={styles.container}>
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
                            <Text style={styles.helperText}> 250 Characters left. </Text>
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
                        <Text style={styles.helperText}> 400 Characters left. </Text>
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
                               variationItem &&  Object.keys(variationItem).map(item => (
                                <View style={styles.variationItems}>
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
                            <View style={styles.addBtnVariation}>
                                <TouchableOpacity onPress={addVariation}>
                                    <Ionicons name="add-circle-outline" size={30} color="#282828" />
                                </TouchableOpacity>
                            </View>
                        </View>
                       
                    </View>
                    <View style={styles.submitBtnHolder}>
                        <View style={{flex:1,}}>
                            <Button style={styles.submitBtn}
                            title="Add Product"
                            color="#282828"
                            onPress={submitProduct}
                        />
                        </View>
                    
                    </View>

                </View>
           </ScrollView>
           <Footer/>
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
        
    }

});

import React, {useState, useEffect, useContext} from 'react'
import { View, Text, TextInput,Modal, ActivityIndicator, ScrollView,KeyboardAvoidingView, StyleSheet,Button, Image, TouchableOpacity, Platform, UIManager } from 'react-native'
import { EvilIcons, Ionicons, Fontisto } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import Loader from './Loader';
import {UserContext} from './UserContext';

if ( Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

function Register({navigation}) {

    const[user,setUser] = useContext(UserContext);

    const [accountType, setAccountType] = useState('');
    const [name, setName] = useState ('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [imageDP, setImageDP] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validation, setValidation] = useState([]);
    const[isLoading, setIsLoading] = useState(false);
    const[registrationError, setRegistrationError] = useState('');

    const [img, setImg] = useState();

    const createNewAccount = ()=> {
        let errors = []
        if(accountType === 'retailer') {
          imageDP === '' &&  errors.push('Store picture required');
          address === '' && errors.push('Address required');
        }

        name === '' &&  errors.push('Name required');
        location === '' && errors.push('City/Town required');
        phone === '' && email === '' && errors.push('Email or phone required');
       
        (name !== '' && name.length >30) && errors.push('Name is exceeded 30 characters');
        (location !== '' && location.length >30) && errors.push('City/Town is exceeded 30 characters');
        phone !== '' && (isNaN(phone) || phone.length !== 10)  && errors.push ('Invalid Phone Number');
        (address !== '' && address.length > 250) && errors.push('Address is exceeded 250 characters');
        if(email !== ''){
            let mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if(! email.match(mailFormat)) {
                errors.push('Invalid Email address');
            }
        }

        password === '' && errors.push('Password required');
        if( password !== '' ){
            if( password.length < 6 ){
              errors.push('Password required minimum 6 characters')
            }
            else if( password !== confirmPassword ){
                errors.push('Password mismatch');
            }
        }

        setValidation(errors);

        errors.length === 0 && saveUserDetails();
        
    }

    const saveUserDetails = ()=> {
        setRegistrationError('');
        setIsLoading(true);
        let formData = new FormData();
        if(imageDP !== ''){
            let uriParts = imageDP.split('.');
            let fileType = uriParts[uriParts.length - 1];
            formData.append('photo', {
                uri:imageDP,
                name: `photo.${fileType}`,
                type: `image/${fileType}`,
            });
        }
        formData.append('accountType',accountType);
        formData.append('name',name);
        formData.append('email',email);
        formData.append('location',location);
        formData.append('phone',phone!==''?'91'+phone:'');
        formData.append('address',address);
        formData.append('password',password);
        axios.post(global.APILink+'/user',formData)
        .then( res => {
            setIsLoading(false);
            if ( res.data.status === 'success' ) {
                storeUserLocally(res.data.user_id);
            }
            else {
                setRegistrationError(res.data.message);
            }
        })
        .catch( err => console.log(err));
    }

    const storeUserLocally = async(user_id)=>{
        //console.log(user_id);
        try {
           await SecureStore.setItemAsync('t4_user_id',user_id.toString() );
          // setUser({'id':user_id,}); //update userContext
            let userData = {...user};
            userData.id = user_id.toString();
            setUser(userData);
            navigation.navigate('Account',{accountId:user_id.toString()})
            return true;
          } catch (e) {
            console.log(e);
            return false;
          }
    }

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
          quality: .4,
        });
      
        if (!result.cancelled) {
          setImageDP(result.uri);
          setImg(result);
        }
      };

    
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{flex:1,}} >
               
        <View style={styles.container}>
           <ScrollView> 
           <Loader isLoading={isLoading} />
                <View style={styles.formHolder}>
                    <Text style={styles.title}> Create new account </Text>
                    
                    {
                    accountType === '' &&  <>
                    <View style={styles.accountTypeHolder}>
                        <View style={{ alignSelf: 'center'}}>
                            <TouchableOpacity onPress={()=>{setAccountType('customer')}}>
                                <Text style={styles.accountType}>Register as a  customer</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.helperText}>
                            If you are a person who is looking for the available products and offers in your area, 
                            the you can register as a customer.
                        </Text>
                    </View>
                    <View style={styles.accountTypeHolder}>
                        <View style={{ alignSelf: 'center'}}>
                            <TouchableOpacity onPress={()=>{setAccountType('retailer')}}>
                                <Text style={styles.accountType}>Register as a retailer</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.helperText}>
                            If your a person who is looking for a platform where you can showcase your products and offers,
                            then you can register as retailer.
                        </Text>
                    </View>
                    </>
                    }
                    { accountType !== '' && <View>
                     <Text>Account type : {accountType}</Text>
                        <View style={styles.DPHolder}>

                            {
                               imageDP === '' &&  ( accountType === 'customer' ? <EvilIcons name="user" size={70} color="#282828" />
                                : <Fontisto name="shopping-store" size={50} color="#282828" /> )
                            }
                            {
                                imageDP !== '' && <Image  style={styles.DP}
                                source={{uri:imageDP }}/>
                            }
                            <TouchableOpacity onPress={pickImage}>
                                <Ionicons name="add-circle-outline" size={40} color="#282828" />
                            </TouchableOpacity>
                        </View>
                        {accountType === 'customer'? <Text>
                            Profile picture
                        </Text> : <Text>
                            Store picture
                            </Text>}
                    <View style={styles.formGroup}>

                        <Text>Name</Text>
                        <TextInput 
                        style={styles.textBox}
                        onChangeText = { text => setName(text)}
                        value = {name}
                        />

                        <Text>City/Town</Text>
                        <TextInput style={styles.textBox}
                        onChangeText ={text =>setLocation(text)}
                        value={location} />

                        <Text>Email </Text>
                        <TextInput style={styles.textBox}
                        onChangeText ={text =>setEmail(text)}
                        value={email} />

                        <Text>{accountType==='customer'? 'Phone' : 'WhatsApp'} </Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{paddingTop:10,paddingRight:5}}>+91</Text>
                            <TextInput style={[styles.textBox,{flex:1,}]}
                                onChangeText ={text =>setPhone(text)}
                                value={phone} />
                        </View>

                        <Text>Address </Text>
                        <TextInput style={[styles.textBox,styles.textArea]}
                        multiline = {true}
                        numberOfLines ={5}
                        onChangeText ={text =>setAddress(text)}
                        value={address} />

                        <Text>Password </Text>
                        <TextInput style={styles.textBox}  secureTextEntry
                        onChangeText ={text =>setPassword(text)}
                        value={password} />
                        <Text>Confirm Password </Text>
                        <TextInput style={styles.textBox}  secureTextEntry
                        onChangeText ={text =>setConfirmPassword(text)}
                        value={confirmPassword} />

                    </View>

                    <View style={styles.validationHolder}>
                        {
                            validation.map((error, index) =>(
                                <Text key={index} style={styles.validation}>{error}</Text>
                            ) )
                        }
                    </View>
                    {
                        registrationError!== '' && <View style={styles.registrationErrorHolder}>
                        <Text style={styles.registrationError}>{registrationError}</Text>
                        </View>
                    }
                    <View style={{flex:1,marginBottom:60,}}>
                        <Button
                        title="REGISTER"
                        color="#282828"
                        onPress={createNewAccount}
                        />
                    </View>

                    </View>
                    }
                </View>
            </ScrollView>
        </View>
        </KeyboardAvoidingView>
    )
}

export default Register

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff",
    },
    formHolder:{
        paddingHorizontal:10,
    },
    title :{
        fontSize:30,
        fontWeight:'600',
        marginVertical:30,
        textAlign:'center',
    },
    accountTypeHolder:{
        marginBottom:60,
    },
    accountType:{
        backgroundColor:'#333333',
        color:'#fff',
        padding:10,
        borderRadius:10,
       
    },
    helperText:{
        fontSize:15,
        marginTop:10,
        textAlign:'center',
    },
    DPHolder:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:20,
        marginBottom:5,
    },
    textBox:{
        backgroundColor:"#f7f7f7",
        borderColor:"#ccc",
        borderRadius:5,
        borderWidth:1,
        marginBottom:15,
       
        padding:5,
    },
    textArea:{
        textAlignVertical:'top',
    },
    formGroup:{
        marginTop:15,
    },
    DP:{
        width:70,
        height:70,
        resizeMode:'contain'
    },
    validationHolder:{
        marginVertical:30,
    },
    validation:{
        color:'red',
    },
    registrationErrorHolder:{
        paddingHorizontal:15,
        paddingVertical:20,
        backgroundColor:'#B22222',
        marginBottom:10,
        marginTop:-20,
    },
    registrationError:{
        color:'#fff',
        fontSize:18,
    }
})
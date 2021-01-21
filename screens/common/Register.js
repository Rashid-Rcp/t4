import React, {useState, useEffect} from 'react'
import { View, Text, TextInput, ScrollView, StyleSheet,Button, Image, TouchableOpacity, Platform, UIManager } from 'react-native'
import { EvilIcons, Ionicons, Fontisto } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';

if ( Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

function Register() {

    
    const [accountType, setAccountType] = useState('customer');
    const [name, setName] = useState ('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [imageDP, setImageDP] = useState('');
    const [validation, setValidation] = useState([]);

    const createNewAccount = ()=>{
        let errors = []
        if(accountType === 'retailer') {
          imageDP === '' &&  errors.push('Store picture required');
          name === '' &&  errors.push('Name required');
          location === '' && errors.push('City/Town required');
          phone === '' &&  errors.push('WhatsApp required');
          address === '' && errors.push('Address required');
        }
        if(accountType === 'customer'){
            name === '' &&  errors.push('Name required');
            location === '' && errors.push('City/Town required');
            phone === '' && email === '' && errors.push('Email or phone required');
        }

        (name !== '' && name.length >30) && errors.push('Name is exceeded 30 characters');
        (location !== '' && location.length >30) && errors.push('City/Town is exceeded 30 characters');
        phone !== '' && (isNaN(phone) || phone.length !== 10)  && errors.push ('Invalid Phone Number');
        (address !== '' && address.length > 250) && errors.push('Address is exceeded 30 characters');
        if(email !== ''){
            let mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if(! email.match(mailFormat)) {
                errors.push('Invalid Email address');
            }
        }
        setValidation(errors);

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
          quality: .5,
        });
      

        if (!result.cancelled) {
          setImageDP(result.uri);
        }
      };

    return (
        <View style={styles.container}>
            <ScrollView>
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
                    </View>

                    <View style={styles.validationHolder}>
                        {
                            validation.map((error, index) =>(
                                <Text key={index} style={styles.validation}>{error}</Text>
                            ) )
                        }
                    </View>

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
        fontSize:20,
        fontWeight:'700',
        marginVertical:30,
        textAlign:'center',
    },
    accountTypeHolder:{
        marginBottom:60,
    },
    accountType:{
        backgroundColor:'#282828',
        color:'#fff',
        padding:10,
        borderRadius:10,
       
    },
    helperText:{
        fontSize:12,
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
        backgroundColor:"#f8f8f8",
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
    }
})
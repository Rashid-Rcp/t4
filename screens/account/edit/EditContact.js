import React,{useState,useEffect, useContext} from 'react'
import { View, Text, TextInput,TouchableOpacity, ScrollView, StyleSheet, Button,KeyboardAvoidingView } from 'react-native'
import axios from 'axios';
import { showMessage } from "react-native-flash-message";
import Footer from '../../common/Footer' 
import ComponentLoader from '../../common/ComponentLoader';
import {UserContext} from '../../common/UserContext';


function EditContact({navigation}) {

    const [user, setUser] = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [accountType, setAccountType] = useState('customer');
    const [validation, setValidation] = useState([]);

    useEffect(()=>{
        if(user.id !== '0'){
            axios.get(global.APILink+'/user/account/edit_contact/'+user.id)
            .then(res=>{
                res.data && setAddress(res.data[0].address);
                res.data && setEmail(res.data[0].email);
                res.data && setAccountType(res.data[0].type);
                if(res.data[0].phone !== '' && res.data[0].phone.length === 12){
                    let phoneNumber = res.data[0].phone
                   if(phoneNumber[0]+phoneNumber[1] === '91'){
                       setPhone(phoneNumber.substring(2));
                   }
                }
                setIsLoading(false);
            })
            .catch(err=>{
                console.log(err);
            })
        }
    },[user])

    const updateContact = ()=>{
        if(user.id !== 0){
            let valid = doValidation();
            if(valid){
                setIsUpdating(true);
                axios.post(global.APILink+'/user/account/edit_contact',{
                    address:address,
                    phone:'91'+phone,
                    email:email,
                    userId:user.id
                })
                .then(res=>{
                    console.log(res.data);
                    if(res.data.status === 'is_exists'){
                        setValidation([res.data.message])
                    }
                    else{
                        res.data.status === 'success' && showFlashMessage('success','Contact updated.');
                        res.data.status !== 'success' && showFlashMessage('danger','An error occurred please try again later.');
                    }
                    setIsUpdating(false);
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        }
    }

    const doValidation = ()=>{
        let errors = [];
        phone === '' && email === '' && errors.push('Email or phone required');
        accountType === 'retailer' && address === '' && errors.push('Address required');
        phone !== '' && (isNaN(phone) || phone.length !== 10)  && errors.push ('Invalid Phone Number');
        (address !== '' && address.length > 250) && errors.push('Address is exceeded 250 characters');
        if(email !== ''){
            let mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if(! email.match(mailFormat)) {
                errors.push('Invalid Email address');
            }
        }
        setValidation(errors);
        if(errors.length>0){
            return false
        }
        else{
            return true
        }
    }

    const showFlashMessage = (type, message) => {
        showMessage({
            title: "Update Profile",
            message: message,
            type: type
        })
    }
    if(isLoading){
        return (
            <ComponentLoader height={100} />
        )
    }
    else{
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView style={styles.keyboardView}
             behavior="padding" enabled   keyboardVerticalOffset={60}>
                <ScrollView>
                    <View style={styles.formHolder}>
                        <Text>Address</Text>
                        <TextInput
                            style={styles.textArea}
                            multiline 
                            numberOfLines={5}
                            onChangeText={text => setAddress(text)}
                            value={address}
                        />
                       
                        <Text>Phone  +91</Text>
                            <TextInput
                                style={styles.textBox}
                                onChangeText={text => setPhone(text)}
                                value={phone}
                            />
                        <Text>Email</Text>
                        <TextInput
                            style={styles.textBox}
                            onChangeText={text => setEmail(text)}
                            value={email}
                        />
                        {
                            validation.map((error,index)=>(
                                <Text key={index} style={styles.validationError}>{error}</Text>
                            ))
                        }
                         <View style={{flex:1,marginTop:30,}}>
                                <Button 
                                disabled={isUpdating}
                                title={isUpdating?"Updating...":"Update"}
                                color="#282828"
                                onPress={updateContact}
                            />
                        </View>
                    </View>
                </ScrollView>
                </KeyboardAvoidingView>
               
               <Footer navigation={navigation}/>
            </View>
        )
    }
}

export default EditContact;

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:20,
    },
    formHolder:{
        paddingHorizontal:10,
        flex:1,
    },
    textBox:{
        width:'100%',
        height:30,
        marginTop:10,
        marginBottom:20,
        borderWidth:1,
        borderColor:'#ccc',
        borderRadius:5,
        paddingHorizontal:5,

    },
    textArea:{
        width:'100%',
        marginTop:10,
        marginBottom:20,
        borderWidth:1,
        borderColor:'#ccc',
        borderRadius:5,
        padding:5,
        textAlignVertical:'top',
    },
    keyboardView:{ flex: 1, flexDirection: 'column',justifyContent: 'center',},
    validationError:{
        marginBottom:10,
        color:'red'
    }

})

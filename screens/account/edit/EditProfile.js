import React, {useState, useEffect, useContext} from 'react';
import { View, Text, TextInput,TouchableOpacity, ScrollView, Button, StyleSheet } from 'react-native'

import axios from 'axios';
import { showMessage, hideMessage } from "react-native-flash-message";

import Footer from '../../common/Footer'
import ComponentLoader from '../../common/ComponentLoader'; 
import {UserContext} from '../../common/UserContext';

function EditProfile({navigation}) {
    const [user,setUser] = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [location, setLocation] = useState('');
    const [name, setName] = useState('');
    const [validation, setValidation] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(()=>{
        if(user.id !== '0'){
            axios.get(global.APILink+'/user/edit_profile/'+user.id)
            .then(res=>{
                res.data && setName(res.data[0].name);
                res.data && setLocation(res.data[0].location);
                setIsLoading(false);
            })
            .catch(err=>{
                console.log(err);
                showFlashMessage('danger','An error occurred please try again later.');
            })
        }
    },[user])
    const updateProfile = ()=>{
        if(user.id !== '0'){
            let valid = doValidation();
            if(valid){
                setIsUpdating(true);
                axios.post(global.APILink+'/user/edit_profile',{name:name,location:location,userId:user.id})
                .then(res=>{
                    res.data.status === 'success' && showFlashMessage('success','Profile updated.');
                    res.data.status !== 'success' && showFlashMessage('danger','An error occurred please try again later.');
                    setIsUpdating(false);
                })
                .catch(err=>{
                    console.log(err);
                    showFlashMessage('danger','An error occurred please try again later.');
                })
            }
        }
    }

    const doValidation = ()=>{
        let errors = [];
        name === '' && errors.push('Name required');
        location === '' && errors.push('City/Town required');
        (name !== '' && name.length >30) && errors.push('Name is exceeded 30 characters');
        (location !== '' && location.length >30) && errors.push('City/Town is exceeded 30 characters');
       setValidation(errors);
       if(errors.length > 0){
        return false;
       }
       else{
           return true;
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
    else {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.formHolder}>
                        <Text>Name</Text>
                        <TextInput
                            style={styles.textBox}
                            onChangeText={text => setName(text)}
                            value={name}
                        />
                        <Text>City/Town</Text>
                        <TextInput
                            style={styles.textBox}
                            onChangeText={text => setLocation(text)}
                            value={location}
                        />
                        {
                            validation.map((error,index)=>(
                                <View key={index}>
                                    <Text style={styles.validationError}>{error}</Text>
                                </View>
                            ))
                        }
                        <View style={{flex:1,marginTop:30,}}>
                            <Button 
                            disabled={isUpdating?true:false}
                            title={isUpdating?"Updating...":'Update'}
                            color="#282828"
                            onPress={updateProfile}
                        />
                        </View>
                    </View>
                </ScrollView>
                <Footer navigation={navigation}/>
            </View>
        )
    }
}

export default EditProfile;

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:20,
    },
    formHolder:{
        flex:1,
        paddingHorizontal:10,
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
    validationError:{
        color:'red',
        marginBottom:10,
    }

});

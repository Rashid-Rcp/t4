import React,{useState, useContext} from 'react'
import { View,Text,StyleSheet,Modal,TextInput, TouchableOpacity, Button,TouchableWithoutFeedback, Keyboard } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import {UserContext} from './UserContext';

function Login({navigation, setShowLogin=()=>{} }) {
    const [visible, setVisible] = useState(true);
    const [email_mob, setEmail_mob] = useState('9895926293');
    const [password, setPassword] = useState('9567669630');
    const [user, setUser] = useContext(UserContext)
    const [validation, setValidation] = useState([]);
    const [isLogin, setIsLogin] = useState(false);

    const handleLogin = ()=>{
        Keyboard.dismiss();
        let valid = doValidation();
        if(valid){
            setIsLogin(true);
            axios.post(global.APILink+'/user/login',{email_mob:email_mob,password:password})
            .then(res=>{
                if(res.data.status === 'success'){
                  storeUserLocally(res.data.userId);
                }
                else{
                    setValidation(['invalid email/phone or password'])
                }
                setIsLogin(false);
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }

    const storeUserLocally = async(user_id)=>{
        try {
           await SecureStore.setItemAsync('t4_user_id',user_id.toString() );
            let userData = {...user};
            userData.id = user_id.toString();
            setVisible(false);
            setShowLogin(false);
            setUser(userData);
            return true;
          } catch (e) {
            console.log(e);
            return false;
          }
    }

    const doValidation = ()=>{
        let errors = [];
        email_mob === '' && errors.push('Email or phone required');
        password === '' && errors.push('Password required');
        if(email_mob !== ''){
            let isValid = false;
            let mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if(email_mob.match(mailFormat)) {
                isValid = true;
            }
            else{
                if(!isNaN(email_mob) && email_mob.length === 10){
                    isValid = true;
                }
            }
            !isValid && errors.push('Invalid email or phone');
        }
        setValidation(errors);

        if(errors.length>0){
            return false
        }
        else{
            return true
        }
    }

    return (
       <View style={StyleSheet.loginContainer}>
           <Modal visible={visible} transparent={true}>
           <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
                <View style={styles.modalContent}>
                    <TouchableOpacity style={styles.closeButton} onPress={()=>{setVisible(false);setShowLogin(false);}}>
                        <AntDesign name="closecircleo" size={30} color="#282828" />
                    </TouchableOpacity>

                    <Text style={styles.title}>
                       Login
                    </Text>
                    <View style={styles.formHolder}>
                        <Text>Email or Phone</Text>
                        <TextInput style={styles.textBox} 
                        onChangeText = {text => setEmail_mob(text)}
                        value ={email_mob}
                        />
                        <Text>password</Text>
                        <TextInput style={styles.textBox} secureTextEntry
                        onChangeText = {text => setPassword(text)}
                        value ={password}
                        />
                        {
                            validation.map((error,index)=>(
                                <Text key={index} style={styles.validationError}>{error}</Text>
                                )
                            )
                        }
                        <View styles={{flex:1,}}>
                            <Button title ={isLogin?'Login...':'Login'}
                            disabled={isLogin}
                            color = '#282828'
                            onPress = {handleLogin} />
                        </View>
                    </View>
                    <TouchableOpacity style={{alignSelf: 'flex-start'}} onPress={()=>{setShowLogin(false);setVisible(false); navigation.navigate('Register');}}>
                        <Text style={styles.createLink}>
                            Create a new account
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{setVisible(false);setShowLogin(false)}}>
                        <Text style={styles.closeLink}>
                            BACK
                        </Text>
                    </TouchableOpacity>
                </View>
                </TouchableWithoutFeedback>
           </Modal>
       </View>
    )
}

export default Login

const styles = StyleSheet.create({
    loginContainer:{
        flex:1,
    },
    modalContent:{
        backgroundColor:'#fff',
        flex:1,
        paddingHorizontal:10,
       
    },
    title:{
        fontSize:20,
        fontWeight:'700',
        marginVertical:50,
        textAlign:'center',
    },
    textBox:{
        backgroundColor:'#f8f8f8',
        borderColor:"#ccc",
        borderRadius:5,
        borderWidth:1,
        padding:5,
        marginBottom:20,
    },
    closeButton:{
        position:'absolute',
        right:20,
        top:20,
    },
    createLink:{
        marginTop:20,
        fontSize:17,
    },
    closeLink:{
        marginTop:30,
       fontWeight:'700',
       borderWidth:.5,
       borderColor:'#282828',
       width:80,
       paddingHorizontal:10,
       textAlign:'center',
       paddingVertical:5,
    },
    validationError:{
        color:'red',
        marginBottom:20,
    }
})

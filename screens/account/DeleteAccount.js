import React,{useState, useContext} from 'react'
import { View, Text, ScrollView,StyleSheet, Button,Alert, TextInput } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import {UserContext} from '../common/UserContext';
function DeleteAccount({navigation}) {

    const [user, setUser] = useContext(UserContext);
    const [password, setPassword] = useState('');
    const [invalid, setInvalid] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const deleteUser = ()=>{
        password === '' && setInvalid(true);
        if(user.id !== '0' && password !== ''){
            setIsDeleting(true);
            axios.post(global.APILink+'/user/delete_account',{userId:user.id,password:password})
            .then(res=>{
                setIsDeleting(false);
                if(res.data.status === 'success'){
                    SecureStore.deleteItemAsync('t4_user_id');
                    let userData = {...user};
                    userData.id='0';
                    userData.location='no_location';
                    setUser(userData);
                    navigation.navigate('Home');
                }
                else if (res.data.status === 'invalid'){
                    Alert.alert(
                        "Invalid Password",
                        "The password you provided is not valid",
                        [
                          { text: "OK" }
                        ],
                        { cancelable: false }
                      );
                }
                else{
                    Alert.alert(
                        "Delete Account",
                        "An Error occurred please try again later.",
                        [
                          { text: "OK" }
                        ],
                        { cancelable: false }
                      );
                }
            })
            .catch(err=>{
                console.log(err);
                Alert.alert(
                    "Delete Account",
                    "An Error occurred please try again later.",
                    [
                      { text: "OK" }
                    ],
                    { cancelable: false }
                  );
            })
        }
    }
    if(user.id === '0'){
        return (
            <View></View>
        )
    }
    else{
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.text}>
                        By deleting the account all your related data will be removed permanently. Are you sure you want to delete your account?
                    </Text>
                    <Text>
                        Confirm your password
                    </Text>
                    <TextInput style={styles.textBox} secureTextEntry
                            onChangeText = {text => setPassword(text)}
                            value ={password}
                            />
                    <View style={styles.delete}>
                        {
                            invalid && <Text style={{color:'red'}}>Please confirm your password</Text>
                        }
                        <Button
                        title = {isDeleting?'Deleting...':'Delete'}
                        color ="#333333"
                        disabled={isDeleting}
                        onPress = {deleteUser}
                        />
                    </View>
    
                    <View style={styles.back}>
                        <Button
                        title = "Back"
                        color ="#333333"
                        onPress = {()=> navigation.navigate('Account',{accountId:user.id})}
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default DeleteAccount

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        padding:10,
    }
    ,textBox:{
        borderWidth:.5,
        borderRightColor:'#ccc',
        borderRadius:5
    },
    delete:{
        marginTop:20,
    },
    text:{
        marginTop:20,
        marginBottom:30,
        fontSize:15,
    },
    back:{
        marginTop:50,
    }
});
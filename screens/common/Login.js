import React,{useState} from 'react'
import { View,Text,StyleSheet,Modal,TextInput, TouchableOpacity, Button,TouchableWithoutFeedback, Keyboard } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

function Login({navigation}) {
    const [visible, setVisible] = useState(true);
    const [email_mob, setEmail_mob] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = ()=>{

    }

    return (
       <View style={StyleSheet.loginContainer}>
           <Modal visible={visible} transparent={true}>
           <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
                <View style={styles.modalContent}>
                    <TouchableOpacity style={styles.closeButton} onPress={()=>{setVisible(false)}}>
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
                        <View styles={{flex:1,}}>
                            <Button title ='LOGIN'
                            color = '#282828'
                            onPress = {handleLogin} />
                        </View>
                    </View>
                    <TouchableOpacity onPress={()=>{setVisible(false); navigation.navigate('Register')}}>
                        <Text style={styles.createLink}>
                            Create a new account
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{setVisible(false)}}>
                        <Text style={styles.closeLink}>
                            CLOSE
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
       fontWeight:'700'
    }
})

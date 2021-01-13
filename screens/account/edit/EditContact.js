import React,{useState} from 'react'
import { View, Text, TextInput,TouchableOpacity, ScrollView, StyleSheet, Button,KeyboardAvoidingView } from 'react-native'

import Footer from '../../common/Footer' 


function EditContact() {

    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const updateContact = ()=>{

    }

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
                    <Text>Phone</Text>
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
                     <View style={{flex:1,marginTop:30,}}>
                            <Button 
                            title="Update"
                            color="#282828"
                            onPress={updateContact}
                        />
                    </View>
                </View>
            </ScrollView>
            </KeyboardAvoidingView>
           
           <Footer/>
        </View>
    )
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

})

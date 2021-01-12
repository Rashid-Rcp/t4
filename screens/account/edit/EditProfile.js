import React, {useState} from 'react'
import { View, Text, TextInput,TouchableOpacity, ScrollView, Button, StyleSheet } from 'react-native'

import Footer from '../../common/Footer' 

function EditProfile() {
    const [location, setLocation] = useState('');
    const [name, setName] = useState('');

    const updateProfile = ()=>{

    }

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
                    <Text>Location</Text>
                    <TextInput
                        style={styles.textBox}
                        onChangeText={text => setLocation(text)}
                        value={location}
                    />
                    <View style={{flex:1,marginTop:30,}}>
                        <Button 
                        title="Update"
                        color="#282828"
                        onPress={updateProfile}
                    />
                    </View>
                </View>
                
            </ScrollView>
            <Footer/>
        </View>
    )
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

    }

});

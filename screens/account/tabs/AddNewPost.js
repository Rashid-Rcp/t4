import React from 'react';
import { View,TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

function AddNewPost() {
    return (
        <View style={{position: 'absolute', bottom: 50,left:0,right:0, alignItems: 'center'}}>
            <TouchableOpacity>
                <Ionicons name="add-circle" size={50} color="#282828" />
            </TouchableOpacity>
        </View>
    )
}

export default AddNewPost

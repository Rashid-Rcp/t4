import React,{useContext} from 'react';
import { View,TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

import {ActiveTabContext} from './ActiveTabContext';

function AddNewPost({navigation}) {
    const [activeTab,setActiveTab] = useContext(ActiveTabContext);
    return (
            activeTab !=='none' &&
            <View style={{position: 'absolute', bottom: 50,left:0,right:0, alignItems: 'center'}}>
            <TouchableOpacity onPress={() => navigation.navigate('AddNew'+activeTab)}>
                <Ionicons name="add-circle" size={50} color="#282828" />
            </TouchableOpacity>
        </View>
    )
}

export default AddNewPost

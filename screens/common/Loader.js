import React from 'react';
import { Modal,View,Text,ActivityIndicator } from 'react-native';

function Loader({isLoading}) {
    return (
        <Modal visible={isLoading} transparent={true}>
            <View style={{flex:1,backgroundColor:"#fafafa",opacity:.5,flex:1,}}>
            </View>
            <View style={{position:'absolute',right:'43%',top:'50%'}}>
                    <ActivityIndicator size="large" color="#0a2351"  />
                    <Text>Loading...</Text>
            </View>
        </Modal>
    )
}

export default Loader

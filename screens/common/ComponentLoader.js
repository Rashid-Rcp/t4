import React from 'react';
import { View,ActivityIndicator } from 'react-native';

function ComponentLoader({height}) {
    return (
        <View style={{flex:1,
        justifyContent:'center',
        alignItems:'center',
        height:height}}>
            <ActivityIndicator size="small" color="#0a2351"  />
        </View>
    )
}

export default ComponentLoader

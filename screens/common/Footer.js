import React,{useEffect, useState} from 'react';
import { StyleSheet, View,Text,Keyboard,Platform, UIManager, LayoutAnimation } from 'react-native';
import { MaterialCommunityIcons,AntDesign,FontAwesome } from '@expo/vector-icons'; 

if ( Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

function Footer() {

    const [showFooter, setShowFooter] = useState(true);

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
    
        // cleanup function
        return () => {
          Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
          Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        };
      }, []);

      const _keyboardDidShow = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        setShowFooter(false);
      };
    
      const _keyboardDidHide = () => {
        setShowFooter(true);
      };

    return (
        showFooter && <View style={styles.footer}>
          <MaterialCommunityIcons name="store-outline" size={35} color="#282828" />
          <MaterialCommunityIcons name="lightning-bolt-outline" size={35} color="#282828" />
          <AntDesign name="search1" size={35} color="#282828" />
          <FontAwesome name="hand-grab-o" size={35} color="#282828" />
          <AntDesign name="gift" size={35} color="#282828" />
        </View>
    ) 
}

export default Footer

const styles = StyleSheet.create({
    footer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        height:50,
        backgroundColor:'#fff',
        borderColor:'#dfe1e5',
        borderWidth:1,
    }
});
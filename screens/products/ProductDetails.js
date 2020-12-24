import React,{useState} from 'react';
import { View, Text, StyleSheet,TouchableOpacity, Platform, UIManager,LayoutAnimation, } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';


if ( Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

function ProductDetails() {
    const [expanded, setExpanded] = useState(false);
    return (
        <View>
            <View style={styles.details}>
                <Text style={styles.title}>Product title </Text>
                <Text style={styles.price}>₹1000</Text>
            </View>
            <View style={styles.expander}>
                <TouchableOpacity 
                    onPress={() => {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                    setExpanded(!expanded);
                    }}
                >   
                <View style={styles.expanderIcon}>
                    <MaterialCommunityIcons  name={expanded?"chevron-up":"chevron-down"} size={35} color="#282828" />
                </View>
                 </TouchableOpacity>
                 {expanded && (
                    <View style={styles.expanderDetails}>
                        <Text style={styles.variationTitle}>Size</Text>
                        <View style={styles.variations}>
                            <Text style={styles.variationItem}>S  ₹100</Text>
                            <Text style={styles.variationItem}>M  ₹100</Text>
                            <Text style={styles.variationItem}>L  ₹130</Text>
                            <Text style={styles.variationItem}>XL  ₹130</Text>
                        </View>
                        <Text style={styles.description}>
                            Product description and any other details of the product item and other lorem ispum al hudai 
                        </Text>
                    </View>
                    )}
            </View>
        </View>
        
    )
}

export default ProductDetails;

const styles= StyleSheet.create({
    details:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:5,
      
    },
    title:{
        flex:1,
        paddingLeft:10,
        paddingRight:5,
        fontSize:17,
        flexWrap:'wrap',
        paddingBottom:5,
        zIndex:3,
    },
    price:{     
        flex:0,
        paddingRight:10,
        paddingLeft:5,
        fontSize:18,
        zIndex:3,
    },
    expander:{
        flex:1,
        marginTop:-20,
    },
    expanderIcon:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
    },
    expanderDetails:{
        paddingHorizontal:10,
        paddingBottom:10,
        marginBottom:5,
        backgroundColor:'#FAFAFA',
        borderBottomColor:'#dfe1e5',
        borderBottomWidth:.5,
       
    },
    variations:{
       flex:1,
       flexDirection:'row',
       flexWrap:'wrap', 
       paddingHorizontal:10,
    },
    variationTitle:{
        fontSize:17,
        fontWeight:'600',
    },
    variationItem:{
        paddingHorizontal:7,
        paddingVertical:3,
        borderColor:'#ccc',
        borderWidth:1,
        marginHorizontal:3,
        borderRadius:100,
        marginTop:3,
    },
    description:{
        marginTop:10,
    }
});
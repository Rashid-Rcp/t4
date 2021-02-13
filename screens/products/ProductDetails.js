import React,{useState, useEffect} from 'react';
import { View, Text, StyleSheet,TouchableOpacity, Platform, UIManager,LayoutAnimation, } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';


if ( Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

function ProductDetails({productDetails, itemType}) {
    const [expanded, setExpanded] = useState(false);

    //for testing purpose
    const [type, setType] = useState(itemType.type); // product or offer
    const [variation, setVariation] = useState(itemType.type === 'products'? true : false); //true or false
    const [variationData, setVariationData] = useState({});

    useEffect(() => {
        setType(itemType.type);
        setVariation(itemType.type === 'products'? true : false);
    }, [itemType])

    return (
        <View>
            <View style={styles.details}>
                <Text style={styles.title}>{productDetails.title}</Text>
                {type === 'products' && <Text style={styles.price}>₹{productDetails.price}</Text>}
            </View>
            <View style={styles.expander}>
                <TouchableOpacity 
                    onPress={() => {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                    type === 'products' && setVariationData(JSON.parse(productDetails.variation));  
                    setExpanded(!expanded);
                    }}
                >   
                <View style={styles.expanderIcon}>
                    <MaterialCommunityIcons  name={expanded?"chevron-up":"chevron-down"} size={35} color="#585858" />
                </View>
                 </TouchableOpacity>
                 
                 {expanded && (
                    <View style={styles.expanderDetails}>
                        { variation && Object.keys(variationData).map((title,index)=>{
                           return( <View key={index}>
                           <Text style={styles.variationTitle}>{title}</Text>
                            <View style={styles.variations}>
                                {
                                    Object.keys(variationData[title]).map((item,index)=>{
                                        return(
                                            <Text key={index} style={styles.variationItem}>{item} ₹{variationData[title][item]}</Text> 
                                        )
                                    })
                                }
                            </View>
                            </View>
                            )
                             })
                        }
                        <Text style={styles.description}>
                            {productDetails.description}
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
        marginTop:-15,
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
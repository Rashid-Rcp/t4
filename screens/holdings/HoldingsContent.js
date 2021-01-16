import React from 'react';
import { View,Text,TouchableOpacity,StyleSheet,Dimensions,ScrollView } from 'react-native';

import ProductHeader from '../products/ProductHeader';
import ProductMedia from '../products/ProductMedia';
import ProductFooter from '../products/ProductFooter';
import ProductDetails from '../products/ProductDetails';

function HoldingsContent() {

    const width = Dimensions.get('window').width;
    const widthPercentage =((1080-width)/1080) *100;
    const height = (1350/100) * (100-widthPercentage);
    const mediaDimension = {
      width:width,
      height:height,
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.holder}>
                    <ProductHeader/>
                    <ProductMedia mediaDimension={mediaDimension}/>
                    <ProductDetails itemType={{type:'product'}}/>
                    <ProductFooter holdings={true}/>
                </View>

                <View style={styles.holder}>
                    <ProductHeader/>
                    <ProductMedia mediaDimension={mediaDimension}/>
                    <ProductDetails itemType={{type:'offer'}}/>
                    <ProductFooter holdings={true}/>
                </View>

                <View style={styles.holder}>
                    <ProductHeader/>
                    <ProductMedia mediaDimension={mediaDimension}/>
                    <ProductDetails itemType={{type:'product'}}/>
                    <ProductFooter holdings={true}/>
                </View>

            </ScrollView>
        </View>
    )
}

export default HoldingsContent;

const styles =StyleSheet.create({
    container:{
        flex:1,
      
    }
});
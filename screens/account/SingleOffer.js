import React from 'react'
import { View,Text,Image, Button, ScrollView, StyleSheet, Dimensions } from 'react-native'

import ProductMedia from '../products/ProductMedia'
import ProductDetails from '../products/ProductDetails'
import ProductFooter from '../products/ProductFooter'
import Footer from '../common/Footer';

function SingleOffer({navigation}) {
    const width = Dimensions.get('window').width;
    const widthPercentage =((1080-width)/1080) *100;
    const height = (1350/100) * (100-widthPercentage);
    const mediaDimension = {
        width:width,
        height:height,
      }
      const enable_disable_offer = ()=>{

      }

      const deleteOffer = ()=>{

      }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.holder}>
                    <ProductMedia mediaDimension={mediaDimension}/>
                    <ProductDetails itemType={{type:'offer'}}/>
                    <ProductFooter/>
                    <View style={{flex:1,alignItems:'center'}}>
                        <View style={{width:'70%'}}>
                                <Button 
                                title="Disable"
                                color="#282828"
                                onPress={enable_disable_offer}
                            />
                        </View>
                    </View>
                    
                    <View style={{flex:1,marginTop:15,marginBottom:50,alignItems:'center'}}>
                        <View style={{width:'70%'}}>
                            <Button 
                            title="Delete"
                            color="#282828"
                            onPress={deleteOffer}
                            />
                        </View>
                       
                    </View>
                </View>
            </ScrollView>
            <Footer navigation={navigation}/>
        </View>
    )
}

export default SingleOffer

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fafafa',
    },
    holder:{
        flex:1,
    }
});

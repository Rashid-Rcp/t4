import React,{useRef, useState} from 'react';
import { View, Image, StyleSheet,Text,TouchableOpacity,Dimensions,TouchableWithoutFeedback } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import { Entypo } from '@expo/vector-icons'; 

function ProductsImages({images, productID, navigation , type='products', selfAccount}) {

    const width = (Dimensions.get('window').width)/2;
    const widthPercentage =((1080-width)/1080) *100;
    const height = (1350/100) * (100-widthPercentage);

    const [index, setIndex] = useState(0)
    const isCarousel = useRef(null)
    const productImages = JSON.parse(images);
    const CarouselCardItem = ({ item, index }) => {
      
        return (
          <View style={styles.imageHolder} key={index}>
            <TouchableWithoutFeedback onPress={()=>{type==='products'?navigation.navigate('SingleProduct',{productId:productID, selfAccount:selfAccount}):
            navigation.navigate('SingleOffer',{offerId:productID, selfAccount:selfAccount})}} 
            style={{justifyContent:'center',alignItems:'center'}}>
                <Image
                source={{ uri: global.serverPublic+'/'+type+'/'+item }}
                style={{width:width,height:height, resizeMode:'contain'}}
                />
           </TouchableWithoutFeedback>
          </View>
        )
      }
    return (
        <>
       <View style={styles.container}>
                <Carousel
                    layout="default"
                    layoutCardOffset={9}
                    ref={isCarousel}
                    data={productImages}
                    renderItem={CarouselCardItem}
                    sliderWidth={width}
                    itemWidth={width}
                    onSnapToItem={(index) =>setIndex(index)} 
                    useScrollView={false}
                />
          
       </View>
       <View style={styles.dots}>
           
           {
             productImages.length >1 &&  productImages.map((item,imgIndex)=>{
                   return (
                    <Entypo key={imgIndex} name="dot-single" size={imgIndex==index?25:20} color="#0a2351" /> 
                   )
               })
           }
       
       </View>
       </>
    )
}

export default ProductsImages

const styles = StyleSheet.create({
    container:{
      flexDirection:'row'
    },
    imageHolder:{
       flex:1,
       flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    dots:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        height:10,
        marginTop:5,
    }
});

import React,{useRef, useState} from 'react'
import { View, Image, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Entypo } from '@expo/vector-icons'; 

function ProductMedia({images, mediaDimension, type='products'}) {

    const [index, setIndex] = useState(0)
    const isCarousel = useRef(null)
    const productImages = JSON.parse(images);
    const CarouselCardItem = ({ item, index }) => {
     
        return (
          <View style={styles.imageHolder} key={index}>
                <Image
                source={{ uri: global.serverPublic+'/'+type+'/'+item }}
                style={{width:mediaDimension.width,height:mediaDimension.height, resizeMode:'contain'}}
                />
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
                     sliderWidth={mediaDimension.width}
                     itemWidth={mediaDimension.width}
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

export default ProductMedia;

const styles = StyleSheet.create({
    container:{
        flex:1,
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
import React from 'react';
import { View,Text,TouchableOpacity,StyleSheet,ScrollView,FlatList,Image,Dimensions } from 'react-native';

function TrendsContent({navigation}) {

    const width = (Dimensions.get('window').width)/3;
    const widthPercentage =((1080-width)/1080) *100;
    const height = (1350/100) * (100-widthPercentage);

    const DATA = [
        {
          id: '1',
          title: 'First Item 01',
        },
        {
          id: '2',
          title: 'Second Item 2',
        },
        {
          id: '3',
          title: 'Second Item 3',
        },
        {
            id: '4',
            title: 'Second Item 4',
        },
        {
            id: '5',
            title: 'Second Item 4',
          },
          {
            id: '6',
            title: 'Second Item 4',
          },
          {
            id: '7',
            title: 'Second Item 4',
          },
          {
            id: '8',
            title: 'Second Item 4',
          },
          {
            id: '9',
            title: 'Second Item 4',
          },
          {
            id: '10',
            title: 'Second Item 4',
          },
      
      ];

      const renderItem = ({ item }) => (
        <View style={styles.imageHolder}>
            <TouchableOpacity onPress={()=>navigation.navigate('TrendDetails')}>
                <Image source={{uri:'https://picsum.photos/1080/1350'}} 
                style={{width:width,height:height, resizeMode:'contain',borderWidth:2,borderColor:'#fff',}} />
            </TouchableOpacity>
           
        </View>
      );

    return (
        <View style={styles.container}>
           
            <FlatList
                columnWrapperStyle={{justifyContent: 'space-around'}}
                data={DATA}
                numColumns={3}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default TrendsContent;

const styles =StyleSheet.create({
    container:{
        flex:1,
    },
    imageHolder:{
        padding:2,
    }
});
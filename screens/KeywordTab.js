import React from 'react'
import { StyleSheet, Text, View, ScrollView} from 'react-native';

function KeywordTab() {
    const keywordHandler = (event)=>{
        console.log(event._dispatchInstances.memoizedProps.children)
    }
    return (
        <View style={styles.tab}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <Text style={styles.keywords} onPress={(event) => keywordHandler(event)} >All</Text>
                <Text style={styles.keywords} onPress={(event) => keywordHandler(event)} >Shirts</Text>
                <Text style={styles.keywords} onPress={(event) => keywordHandler(event)} >T-shirts</Text>
                <Text style={styles.keywords} onPress={(event) => keywordHandler(event)} >All</Text>
                <Text style={styles.keywords} onPress={(event) => keywordHandler(event)} >Shirts</Text>
                <Text style={styles.keywords} onPress={(event) => keywordHandler(event)} >T-shirts</Text>
                <Text style={styles.keywords} onPress={(event) => keywordHandler(event)} >All</Text>
                <Text style={styles.keywords} onPress={(event) => keywordHandler(event)} >Shirts</Text>
                <Text style={styles.keywords} onPress={(event) => keywordHandler(event)} >T-shirts</Text>
                <Text style={styles.keywords} onPress={(event) => keywordHandler(event)} >All</Text>
                <Text style={styles.keywords} onPress={(event) => keywordHandler(event)} >Shirts</Text>
                <Text style={styles.keywords} onPress={(event) => keywordHandler(event)} >T-shirts</Text>
            </ScrollView>
        </View>
    )
}

export default KeywordTab;

const styles = StyleSheet.create({
   tab:{
       flexDirection:'row',
       borderColor:'#dfe1e5',
       borderWidth:1,
       marginVertical:5,
       paddingVertical:3,
   },
   keywords:{
       marginHorizontal:3,
       marginVertical:1,
       paddingHorizontal:10,
       paddingVertical:5,
       backgroundColor:'#f7f7f7',
       borderColor:'#dfe1e5',
       borderWidth:1,
       height:30,
       borderRadius:100
   }
   
  });

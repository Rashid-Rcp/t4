import React,{useEffect, useState} from 'react'
import { View, Text, ScrollView, StyleSheet,Image,TouchableOpacity } from 'react-native';

import axios from 'axios';

function PublicProfile({userId}) {

   const [isLoading, setIsLoading] =useState(true);
   const [refreshing, setRefreshing] = useState(true);
   const [userDetails, setUserDetails] = useState([]);
   
   useEffect(() => {
      axios.get(global.APILink+'/user/'+{userId})
      .then(res=>{

      })
      .catch(err=>console.log(err))
   }, [userId])


    return (
       <View style={styles.container}>
          <ScrollView >

          </ScrollView>
            
       </View>
    )
}

export default PublicProfile

const styles=StyleSheet.create({
   container:{
     flex:1,
     backgroundColor:'red',
   }

});

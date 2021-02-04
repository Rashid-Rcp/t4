import React,{useContext} from 'react';
import { View, } from 'react-native'

import {ActiveTabContext} from './tabs/ActiveTabContext'
import Products from './tabs/Products'
import Offers from './tabs/Offers'
//import Chats from './tabs/Chats'



function TabsContent({navigation, refreshing}) {
    const [activeTab,setActiveTab] = useContext(ActiveTabContext);
    if(activeTab !== 'none'){
      return (
        <>
           {activeTab == 'Product' && <Products navigation={navigation} refreshing={refreshing}/>}
           {activeTab == 'Offer' && <Offers navigation={navigation} refreshing={refreshing} />}
           {/* {activeTab == 'Chats' && <Chats/>} */}
         </>
       )
    }
    else{
      return (<></>)
    }
}

export default TabsContent

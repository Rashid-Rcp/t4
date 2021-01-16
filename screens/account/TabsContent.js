import React,{useContext} from 'react';
import { View, } from 'react-native'

import {ActiveTabContext} from './tabs/ActiveTabContext'
import Products from './tabs/Products'
import Offers from './tabs/Offers'
import Chats from './tabs/Chats'



function TabsContent({navigation}) {
    const [activeTab,setActiveTab] = useContext(ActiveTabContext);
    return (
     <>
        {activeTab == 'Product' && <Products navigation={navigation}/>}
        {activeTab == 'Offer' && <Offers navigation={navigation}/>}
        {activeTab == 'Chats' && <Chats/>}
      </>
    )
}

export default TabsContent

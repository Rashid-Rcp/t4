import React,{useContext} from 'react';
import { View, } from 'react-native'

import {ActiveTabContext} from './tabs/ActiveTabContext'
import Products from './tabs/Products'
import Offers from './tabs/Offers'
import Chats from './tabs/Chats'



function TabsContent() {
    const [activeTab,setActiveTab] = useContext(ActiveTabContext);
    return (
     <>
        {activeTab == 'products' && <Products/>}
        {activeTab == 'offers' && <Offers/>}
        {activeTab == 'chats' && <Chats/>}
      </>
    )
}

export default TabsContent
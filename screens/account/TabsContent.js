import React,{useContext} from 'react';
import { View, } from 'react-native'

import {ActiveTabContext} from './tabs/ActiveTabContext'
import Products from './tabs/Products'
import Offers from './tabs/Offers'
//import Chats from './tabs/Chats'

function TabsContent({navigation, fetchItem, setFetchItem, scrollEnd, selfAccount, resetScrollEnd, accountId}) {
    const [activeTab,setActiveTab] = useContext(ActiveTabContext);
    if(activeTab !== 'none'){
      return (
        <>
           {activeTab == 'Product' && <Products navigation={navigation} fetchItem={fetchItem} setFetchItem={setFetchItem}
            scrollEnd={scrollEnd} selfAccount={selfAccount} resetScrollEnd={resetScrollEnd} accountId={accountId} />}
           {activeTab == 'Offer' && <Offers navigation={navigation} fetchItem={fetchItem} setFetchItem={setFetchItem}
            scrollEnd={scrollEnd} selfAccount={selfAccount} resetScrollEnd={resetScrollEnd} accountId={accountId} />}
         </>
       )
    }
    else{
      return (<></>)
    }
}

export default TabsContent

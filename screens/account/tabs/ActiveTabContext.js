import React,{useState, createContext} from 'react'

export const ActiveTabContext = createContext();

export const ActiveTabProvider = (props)=>{

    const [activeTab, setActiveTab] = useState('Product');

    return (
        <ActiveTabContext.Provider value={[activeTab, setActiveTab]}>
            {props.children}
        </ActiveTabContext.Provider>
    )
}
import React,{useState, createContext} from 'react'

export const ActiveTabContext = createContext();

export const ActiveTabProvider = (props)=>{

    const [activeTab, setActiveTab] = useState('none');

    return (
        <ActiveTabContext.Provider value={[activeTab, setActiveTab]}>
            {props.children}
        </ActiveTabContext.Provider>
    )
}
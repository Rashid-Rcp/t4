import React,{useState, createContext} from 'react'

export const KeywordContext = createContext();

export const KeywordProvider = (props)=>{

    const [keywords, setKeywords] = useState(['All']);

    return (
        <KeywordContext.Provider value={[keywords, setKeywords]}>
            {props.children}
        </KeywordContext.Provider>
    )
}
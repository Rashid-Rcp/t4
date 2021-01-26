import React,{useState, createContext, useEffect} from 'react'
import * as SecureStore from 'expo-secure-store';

export const UserContext = createContext();

export const UserProvider = (props)=>{

    const [user, setUser] = useState({
        'id':'0',
    });
    
    useEffect(() => {
        const get_user = async()=>{
            try {
                const user_id = await SecureStore.getItemAsync('t4_user_id');
                if (user_id) {
                  setUser({
                      'id':user_id
                  });
                }
              } catch (e) {
                console.log(e);
              }
        }
        get_user();
        
    }, [])

    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    )
}
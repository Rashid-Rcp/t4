import React,{useState, createContext, useEffect} from 'react'
import * as SecureStore from 'expo-secure-store';

export const UserContext = createContext();

export const UserProvider = (props)=>{

    const [user, setUser] = useState({
        'id':'0',
        'location':'no_location',
    });
    
    useEffect(() => {
        const get_user = async()=>{
            try {
                const user_id = await SecureStore.getItemAsync('t4_user_id');
                if (user_id) {
                    let userData = {...user};
                    userData.id=user_id;
                    setUser(userData);
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
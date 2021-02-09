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
                const user_location = await SecureStore.getItemAsync('t4_user_location');
                let userData = {...user};
                if (user_id) {
                    userData.id=user_id;
                }
                if(user_location) {
                    userData.location=user_location;
                }
                setUser(userData);
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
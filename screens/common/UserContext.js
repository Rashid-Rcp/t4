import React,{useState, createContext, useEffect} from 'react'
import * as SecureStore from 'expo-secure-store';

export const UserContext = createContext();

export const UserProvider = (props)=>{

    const [user, setUser] = useState({
        'id':'0',
        'location':'no_location',
        'fetch':false
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
                userData.fetch=true;
                setUser(userData);
              } catch (e) {
                console.log(e);
              }
        }
        get_user();


        const logoutUserAccount = ()=>{
            //delete secure store
            SecureStore.deleteItemAsync('t4_user_id');
            let userData = {...user};
            userData.id='0';
            setUser(userData);
           
            
        }

        //logoutUserAccount();
    
        
    }, [])

    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    )
}
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";

export const Authcontext = createContext();
export default function Authprovider ({children}) {
    const [currentUser, setCurrentUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            setIsLoading(true)
            onAuthStateChanged(auth, (user) => {
                if(user.uid !== undefined) {
                    setCurrentUser(user);
                    setIsAuthenticated(true);
                    console.log('User signed in successfully')
                }
            })    
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
        
    }, []);

    <Authcontext.Provider value={{currentUser, setCurrentUser, setIsAuthenticated, isAuthenticated, isLoading}}>
        {children}
    </Authcontext.Provider>

}
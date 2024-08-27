import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../fireBase';


const AuthContext = createContext(null)


export const AuthProvider = ({children}) =>{
    const [currentUser,setCurrentUser] = useState(null)
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        const status = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
            
        })
        return status
    },[])
    const signIn = (email,password) => {
        return auth.signInWithEmailAndPassword(email,password)
    }
    const signUp = (email,password) => {
        return auth.createUserWithEmailAndPassword(email,password)
    }

    const signOut = () => {
        return auth.signOut();
    };
    
    const value = {
        currentUser,
        signUp,
        signIn,
        signOut
    };
    
    return (
        <AuthContext.Provider value={value}>
          {!loading && children}
        </AuthContext.Provider>
    );

    
}

export const useAuth = () => {
    return useContext(AuthContext)
}



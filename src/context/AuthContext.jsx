import React, { createContext, useContext, useEffect, useState } from "react";
import {account} from '../lib/appwriteconfig'
import { ID } from "appwrite";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const  AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        account.get()
            .then((userData) => {
            console.log('already login');
            setUser(userData); // 
            })
            .catch(() => {
            setUser(null);
            console.log("No active session");
            })
            .finally(() => setLoading(false));
     }, []);


    const signup = async(username, password) => {
        try{
            const res = await account.create(ID.unique(), username, password)
            console.log("signup success", res);

            await login(username , password)
        }catch(err){
            console.log('signup  failed:', err.message);
        }
    }
    const login = async(username, password) => {
        try{
            const session = await account.createEmailPasswordSession(username, password)
            const userData = await account.get()
            console.log('login', userData);
            navigate('/home')
            setUser(userData);
        } catch(err){
            console.log('failed', err.message);
        }
    }
    const logout = async() => {
        try{
            await account.deleteSession('current')
            console.log("logout");
            setUser(null)
        } catch(err){
            console.log("logout failout", err.message);
            
        }
    }
    
    return(
        <AuthContext.Provider value={{user, login, logout, signup, loading}}>
        {children}
        </AuthContext.Provider>
    )
};

export  const useAuth = () => useContext(AuthContext)
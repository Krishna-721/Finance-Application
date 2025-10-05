import { useState, useContext, useEffect, createContext} from "react";
import {authAPI} from '../services/api';

const AuthContext=createContext(null);

export const AuthProvider=({children})=>{
    const [user, setUser]=useState(null);
    const [loading, setLoading]=useState(true);

    useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      authAPI.getMe()
        .then(res => {
          setUser(res.data);
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem('token');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);
    const login = async(email, password)=>{
        const response = await authAPI.login({email, password});
        localStorage.setItem('token', response.data.access_token);
        setUser(response.data.user);
        return response.data;
    };

    const register = async(userData) =>{
      const response = await authAPI.register(userData);
      return response.data;
    };

    const logout = ()=>{
      localStorage.removeItem('token');
      setUser(null);
    };

    return (
      <AuthContext.Provider value={{user,login,register,logout, loading}}>
      {children}
      </AuthContext.Provider>
    );
};

export const useAuth=()=>{
  const context = useContext(AuthContext);
  if(!context){
    throw new Error('useAuth must be used with AuthProvider');
  }
  return context;
;}
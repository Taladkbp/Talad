import React, { createContext, useEffect } from 'react'
import useAuthState from './useAuthState';
import { firebase } from '@react-native-firebase/auth';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const {user, isLoading} = useAuthState();

  const signInAnonymously = async () => {
    if(!firebase.auth().currentUser)
    try {
      await firebase.auth().signInAnonymously();
      console.log('Anonymous login successful')
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    signInAnonymously();
    console.log('AuthProvider.js user sign in: ', firebase.auth().currentUser)
  }, [])

  return (
    <AuthContext.Provider value={{user, isLoading, signInAnonymously, signOut}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
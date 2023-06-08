import { firebase } from '@react-native-firebase/auth';
import React, { useEffect, useState } from 'react'

const useAuthState = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [])
  return {user, isLoading}
}

export default useAuthState
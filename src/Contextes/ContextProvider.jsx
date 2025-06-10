import React, { useEffect, useState } from 'react';
import { ContextValue } from './AllContexts';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';

const provider = new GoogleAuthProvider()

const ContextProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // const [assignments, setAssignments] = useState([])
    // useEffect(() => {
    //     fetch('')
    // }, [])

    const registerUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

        const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const loginWithGoogle = () => {
        return signInWithPopup(auth, provider)
    }

    const updateUserProfile = (userProfileData) => {
        return updateProfile(auth.currentUser, userProfileData)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            if(currentUser) {
                setUser(currentUser)
            }
            setLoading(false)
        })

        return () => {
            unSubscribe()
        }
    },[])

    const logOutUser = () => {
        return signOut(auth)
    }


    const value ={
        user,
        setUser,
        registerUser,
        loginUser,
        loginWithGoogle,
        updateUserProfile,
        logOutUser,
        loading
    }
    return (
        <ContextValue value={value}>
            {children}
        </ContextValue>
    );
};

export default ContextProvider;
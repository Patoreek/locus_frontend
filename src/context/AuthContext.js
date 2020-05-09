import React, { useState, createContext } from 'react';

export const AuthContext = createContext();

export const AccountContext = createContext();

export const LoadingContext = createContext();

export const UserOnMapContext = createContext();


export const AuthProvider = (props) => {

    const [isAuth, setIsAuth] = useState(false);


    const [account, setAccount] = useState({
        id: null,
        username: null,
        email: null
    })

    const [ isLoading, setIsLoading ] = useState(true);

    const [ isUserOnMap, setIsUserOnMap ] = useState(false); // Add


    return (
        <AuthContext.Provider value = {[isAuth, setIsAuth]}>
        <AccountContext.Provider value = {[account, setAccount]}>
        <LoadingContext.Provider value = {[isLoading, setIsLoading]}>
        <UserOnMapContext.Provider value = {[isUserOnMap, setIsUserOnMap]}>

                {props.children}
                
        </UserOnMapContext.Provider>
        </LoadingContext.Provider>
        </AccountContext.Provider>
        </AuthContext.Provider>

    );
}


import React, { useState, createContext } from 'react';

export const AuthContext = createContext();

export const TokenContext = createContext();

export const AccountContext = createContext();



export const AuthProvider = (props) => {

    const [isAuth, setIsAuth] = useState(false);

    const [token, setToken] = useState(null);

    const [account, setAccount] = useState({
        id: null,
        username: null
    })

    return (
        <AuthContext.Provider value = {[isAuth, setIsAuth]}>
        <TokenContext.Provider value = {[token, setToken]}>
        <AccountContext.Provider value = {[account, setAccount]}>

                {props.children}

        </AccountContext.Provider>
        </TokenContext.Provider>
        </AuthContext.Provider>

    );
}


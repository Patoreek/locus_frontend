import React, { useState, createContext } from 'react';

export const AuthContext = createContext();

export const AccountContext = createContext();



export const AuthProvider = (props) => {

    const [isAuth, setIsAuth] = useState(false);

    const [account, setAccount] = useState({
        id: null,
        username: null
    });

    return (
        <AuthContext.Provider value = {[isAuth, setIsAuth]}>
            <AccountContext.Provider value = {[account, setAccount]}>

                {props.children}
            </AccountContext.Provider>
        </AuthContext.Provider>

    );
}


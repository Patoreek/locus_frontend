import React, { useState, createContext } from 'react';

export const AuthContext = createContext();

export const AccountContext = createContext();

export const BusyContext = createContext();



export const AuthProvider = (props) => {

    const [isAuth, setIsAuth] = useState(false);


    const [account, setAccount] = useState({
        id: null,
        username: null,
        email: null
    })

    const [ isBusy, setIsBusy ] = useState(true);

    return (
        <AuthContext.Provider value = {[isAuth, setIsAuth]}>
        <AccountContext.Provider value = {[account, setAccount]}>
        <BusyContext.Provider value = {[isBusy, setIsBusy]}>

                {props.children}

        </BusyContext.Provider>
        </AccountContext.Provider>
        </AuthContext.Provider>

    );
}


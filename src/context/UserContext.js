import React, { useState, createContext } from 'react';

export const DetailsContext = createContext();

export const UserProvider = (props) => {

    const [moreDetails, setMoreDetails] = useState(false);


    return (
        <DetailsContext.Provider value = {[moreDetails, setMoreDetails]}>
        
                {props.children}
                
        </DetailsContext.Provider>
    );
}


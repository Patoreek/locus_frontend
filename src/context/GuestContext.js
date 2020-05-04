import React, { useState, createContext } from 'react';

export const DetailsContext = createContext();

export const GuestProvider = (props) => {

    const [moreDetails, setMoreDetails] = useState(false);


    return (
        <DetailsContext.Provider value = {[moreDetails, setMoreDetails]}>
        
                {props.children}
                
        </DetailsContext.Provider>
    );
}


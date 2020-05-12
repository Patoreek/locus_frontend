import React, { useState, createContext } from 'react';


export const FormContext = createContext();






export const UserProvider = (props) => {

    const [ showForm, toggleShowForm ] = useState(null); // Add

    return (
        <FormContext.Provider value = {[showForm, toggleShowForm]}>
        
        
                {props.children}

        </FormContext.Provider>
    );
}


import React, { useState, createContext } from 'react';


export const EditModalContext = createContext();

export const DeleteModalContext = createContext();




export const UserProvider = (props) => {

    const [ showEditModal, setShowEditModal ] = useState(null); // Add
    const [ showDeleteModal, setShowDeleteModal ] = useState(null); // Add

    return (
        <EditModalContext.Provider value = {[showEditModal, setShowEditModal]}>
        <DeleteModalContext.Provider value = {[showDeleteModal, setShowDeleteModal]}>

        
                {props.children}

        </DeleteModalContext.Provider>
        </EditModalContext.Provider>
    );
}


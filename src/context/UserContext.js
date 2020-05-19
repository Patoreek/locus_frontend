import React, { useState, createContext } from 'react';


export const EditModalContext = createContext();

export const DeleteModalContext = createContext();

export const AddModalContext = createContext();



export const UserProvider = (props) => {

    const [ showEditModal, setShowEditModal ] = useState(null); // Add
    const [ showDeleteModal, setShowDeleteModal ] = useState(null); // Add
    const [showAddModal, setShowAddModal] = useState(false);

    return (
        <EditModalContext.Provider value = {[showEditModal, setShowEditModal]}>
        <DeleteModalContext.Provider value = {[showDeleteModal, setShowDeleteModal]}>
        <AddModalContext.Provider value ={[showAddModal, setShowAddModal]}>

                {props.children}
                
        </AddModalContext.Provider>
        </DeleteModalContext.Provider>
        </EditModalContext.Provider>
    );
}


import React, { useState, createContext } from 'react';


export const EditModalContext = createContext();

export const DeleteModalContext = createContext();

export const AddModalContext = createContext();

export const AddRequestContext = createContext();

export const SiteListContext = createContext();




export const UserProvider = (props) => {

    const [ showEditModal, setShowEditModal ] = useState(null); // Add
    const [ showDeleteModal, setShowDeleteModal ] = useState(null); // Add
    const [showAddModal, setShowAddModal] = useState(false);
    const [showAddRequestModal, setShowAddRequestModal] = useState(false);
    const [showSiteList, setShowSiteList] = useState(false);

    return (
        <EditModalContext.Provider value = {[showEditModal, setShowEditModal]}>
        <DeleteModalContext.Provider value = {[showDeleteModal, setShowDeleteModal]}>
        <AddModalContext.Provider value ={[showAddModal, setShowAddModal]}>
        <AddRequestContext.Provider value ={[showAddRequestModal, setShowAddRequestModal]}>
        <SiteListContext.Provider value ={ [showSiteList, setShowSiteList]}>

            {props.children}

        </SiteListContext.Provider>
        </AddRequestContext.Provider>
        </AddModalContext.Provider>
        </DeleteModalContext.Provider>
        </EditModalContext.Provider>
    );
}


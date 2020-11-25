import React, { useState, useContext } from 'react';

import { EditModalContext,
        AddModalContext,
        DeleteModalContext,
        AddRequestContext
        } from '../../../context/UserContext';
import { SiteContext } from '../../../context/DiveSiteContext';

import CreateSiteForm from '../../../components/Forms/Divesite/CreateSiteForm/CreateSiteForm';
import AddRequestForm from '../../../components/Forms/Divesite/AddRequestForm/AddRequestForm';
import EditSiteForm from '../../../components/Forms/Divesite/EditSiteForm/EditSiteForm';
import MySitesHome from './MySitesHome/MySitesHome';


const UserPanel = () => {

    const [ selectedSite, setSelectedSite ] = useContext(SiteContext);

    const [ showEditModal, setShowEditModal ] = useContext(EditModalContext);
    const [ showAddModal, setShowAddModal ] = useContext(AddModalContext);
    const [ showDeleteModal, setShowDeleteModal ] = useContext(DeleteModalContext);
    const [ showAddRequestModal, setShowAddRequestModal ] = useContext(AddRequestContext);

    // console.log(selectedSite);
    let form;


    return (
        <div>
                {/* <ToggleButtons/> */}
                {!showEditModal && !showAddModal && !showDeleteModal && !showAddRequestModal ? <MySitesHome/> : null }
                {showEditModal && selectedSite != null ? <EditSiteForm/> : null}
                {showAddModal ? <CreateSiteForm/> : null}
                {showAddRequestModal ? <AddRequestForm/> : null }


                {/* //TODO: ADD FORMS HERE WITH LOGIC */}
        </div>
    );
};

export default UserPanel;
import React, { useState, useContext } from 'react';

import { EditModalContext,
        AddModalContext,
        DeleteModalContext
        } from '../../../context/UserContext';
import { SiteContext } from '../../../context/DiveSiteContext';

import CreateSiteForm from '../../../components/Forms/CreateSiteForm/CreateSiteForm';
import EditSiteForm from '../../../components/Forms/EditSiteForm/EditSiteForm';
import DeleteContainer from '../../../components/Forms/DeleteContainer/DeleteContainer';
import UserSiteListContainer from './UserSiteListContainer/UserSiteListContainer';

import ToggleButtons from '../ToggleButtons/ToggleButtons';

const UserPanel = () => {

    const [ selectedSite, setSelectedSite ] = useContext(SiteContext);

    const [ showEditModal, setShowEditModal ] = useContext(EditModalContext);
    const [ showAddModal, setShowAddModal ] = useContext(AddModalContext);
    const [ showDeleteModal, setShowDeleteModal ] = useContext(DeleteModalContext);
    // console.log(selectedSite);
    let form;
    


    return (
        <div>
                {/* <ToggleButtons/> */}
                {!showEditModal && !showAddModal && !showDeleteModal ? <UserSiteListContainer/> : null }
                {showEditModal ? <EditSiteForm/> : null}
                {showAddModal ? <CreateSiteForm/> : null}
                {/* //TODO: ADD FORMS HERE WITH LOGIC */}
        </div>
    );
};

export default UserPanel;
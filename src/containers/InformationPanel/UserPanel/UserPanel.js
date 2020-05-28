import React, { useState, useContext } from 'react';

import { FormContext } from '../../../context/UserContext';
import { SiteContext } from '../../../context/DiveSiteContext';

import CreateSiteForm from '../../../components/Forms/CreateSiteForm/CreateSiteForm';
import EditSiteForm from '../../../components/Forms/EditSiteForm/EditSiteForm';
import DeleteContainer from '../../../components/Forms/DeleteContainer/DeleteContainer';
import UserSiteListContainer from './UserSiteListContainer/UserSiteListContainer';

import ToggleButtons from '../ToggleButtons/ToggleButtons';

const UserPanel = () => {

    //const [ showForm, toggleShowForm ] = useContext(FormContext);

    const [ selectedSite, setSelectedSite ] = useContext(SiteContext);
    // console.log(selectedSite);
    let form;
    


    return (
        <div>
                {/* <ToggleButtons/> */}
                <UserSiteListContainer/>
        </div>
    );
};

export default UserPanel;
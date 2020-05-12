import React, { useState, useContext } from 'react';

import { FormContext } from '../../../context/UserContext';
import { SiteContext } from '../../../context/DiveSiteContext';

import CreateSiteForm from '../../../components/Forms/CreateSiteForm/CreateSiteForm';
import EditSiteForm from '../../../components/Forms/EditSiteForm/EditSiteForm';
import DeleteContainer from '../../../components/Forms/DeleteContainer/DeleteContainer';
import UserSiteListContainer from './UserSiteListContainer/UserSiteListContainer';

import ToggleButtons from '../ToggleButtons/ToggleButtons';

const UserPanel = () => {

    const [ showForm, toggleShowForm ] = useContext(FormContext);

    const [ selectedSite, setSelectedSite ] = useContext(SiteContext);
    // console.log(selectedSite);
    let form;
    
    if (showForm === 'ADD') {
        form = (
            <div>
                <button onClick={() => {
                    toggleShowForm(null)
                }}>Back
                </button>
                <CreateSiteForm/>
            </div>
        )
    }
    //console.log('[Before ShowForm === EDIT ~ showForm is]' + showForm);
    if (showForm === 'EDIT') {
        form = (
            <div>
                <button onClick={() => {
                    toggleShowForm(null)
                }}>Back
                </button>
                <EditSiteForm/>
            </div>
        )
    }

    if (showForm === 'DELETE'){
        form = (
                <div>
                    <button onClick={() => {
                        toggleShowForm(null)
                    }}>Back
                    </button>
                    <DeleteContainer/>
                </div>
                )
    }

    if (showForm === null){
        form = <UserSiteListContainer/>
    }

    return (
        <div>
                <ToggleButtons/>
                {form}
        </div>
    );
};

export default UserPanel;
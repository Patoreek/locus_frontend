import React, { useState, useContext } from 'react';

import { FormContext } from '../../../context/AdminContext';
import { SiteContext } from '../../../context/DiveSiteContext';

import CreateSiteForm from '../../../components/Forms/CreateSiteForm/CreateSiteForm';
import EditSiteForm from '../../../components/Forms/EditSiteForm/EditSiteForm';
import DeleteContainer from '../../../components/Forms/DeleteContainer/DeleteContainer';

const AdminPanel = () => {

    const [ showForm, toggleShowForm ] = useContext(FormContext);

    const [ selectedSite, setSelectedSite ] = useContext(SiteContext);
    // console.log(selectedSite);
    let form;
    
    if (showForm === 'ADD') {
        form =  <CreateSiteForm/>;
    }
    //console.log('[Before ShowForm === EDIT ~ showForm is]' + showForm);
    if (showForm === 'EDIT') {
        form = <EditSiteForm/>
    }

    if (showForm === 'DELETE'){
        form = <DeleteContainer/>
    }

    return (
        <div>
                <div>
                    <h1> ADMIN SECTION</h1>
                    <h1> Information section</h1>
                    <h2> How to use this section</h2>
                    <p>Click on the map in an empty location to place a marker.</p>
                    <p>Click on your existing markers to edit the information</p>
                </div>

                {form}
        </div>
    );
};

export default AdminPanel;
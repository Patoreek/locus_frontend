import React, { useContext } from 'react';

import { FormContext } from '../../../../../context/UserContext';
import { SiteContext } from '../../../../../context/DiveSiteContext';

import classes from './SiteList.module.css';



const SiteList = (props) => {

    const [ showForm, toggleShowForm ] = useContext(FormContext);
    const [ selectedSite, setSelectedSite ] = useContext(SiteContext);


    const editSiteHandler = () => {
        console.log('[Selected Site]' + selectedSite);
        if (showForm !== 'EDIT'){
            toggleShowForm('EDIT');
        } else {
            toggleShowForm(null);
        }
    }


    const showDeleteForm = () => {
        console.log('[Selected Site]' + selectedSite);
        if (showForm !== 'DELETE'){
            toggleShowForm('DELETE');
        } else {
            toggleShowForm(null);
        }
    }

    const sites = props.sites;
    console.log('[SiteList]');
    console.log(sites);
    return (
        sites.map(site => (
            <div className={classes.siteContainer}>
                <h4>Site Name: {site.name} </h4>
                <h6>Site Area: {site.area}</h6>
                <p> Description: {site.description}</p>
                <p> Date Created: {site.createdAt}</p>
                <button onClick={() =>{
                    setSelectedSite(site);
                    editSiteHandler();
                }}>Edit</button> 
                <button onClick={() =>{
                    setSelectedSite(site);
                    showDeleteForm();
                }}>Delete</button> 

            </div>
        ))
            

    );
};

export default SiteList;
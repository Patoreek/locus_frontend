import React, { useContext } from 'react';

import { EditModalContext,
         DeleteModalContext } from '../../../../../context/UserContext';
import { SiteContext } from '../../../../../context/DiveSiteContext';

import { Button } from 'react-bootstrap';

import classes from './SiteList.module.css';



const SiteList = (props) => {

    const [ showEditModal, setShowEditModal ] = useContext(EditModalContext);
    const [ selectedSite, setSelectedSite ] = useContext(SiteContext);
    const [showDeleteModal, setShowDeleteModal] = useContext(DeleteModalContext);


    const editSiteHandler = () => {
        setShowDeleteModal(false);
        setShowEditModal(true);
    }


    const showDeleteForm = () => {
        setShowEditModal(false);
        setShowDeleteModal(true);
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
                <Button 
                    variant="info"
                    onClick={() =>{
                        setSelectedSite(site);
                        editSiteHandler();
                }}>
                    Edit
                </Button> 
                <Button 
                    variant="danger"
                    onClick={() =>{
                        setSelectedSite(site);
                        showDeleteForm();
                }}>
                    Delete
                </Button> 

            </div>
        ))
            

    );
};

export default SiteList;
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
                <div className={classes.siteImageContainer}>

                    <img src={'http://localhost:8080/' + site.images[0]}
                        className={classes.siteImage}
                    />
                </div>

                <div className={classes.siteNameContainer}>
                    <h5  className={classes.siteName}>
                             {site.name}, {site.area}
                    </h5>
                </div>

                <div className={classes.siteDescriptionContainer}>
                    <p className={classes.siteDescription}> {site.description} </p>
                    <div className={classes.moreDetailsButtonContainer}>
                    </div>
                </div>

                <div className={classes.editButtonContainer}>
                    <Button 
                        variant="info"
                        onClick={() =>{
                            setSelectedSite(site);
                            editSiteHandler();
                        }}
                        className={classes.editButton}>
                        Edit
                    </Button> 
                </div>

                <div className={classes.deleteButtonContainer}>
                    <Button 
                        variant="danger"
                        onClick={() =>{
                            setSelectedSite(site);
                            showDeleteForm();
                        }}
                        className={classes.deleteButton}>
                        Delete
                    </Button> 
                </div>
            
            </div>
        ))
            

    );
};

export default SiteList;
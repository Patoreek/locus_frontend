import React, {useState, useContext} from 'react';

import {
    Button
} from 'react-bootstrap';

import classes from './DeleteContainer.module.css';

//import { FormContext } from '../../../context/UserContext';
import { SiteContext,
         DiveSitesContext,
         LoadDiveSiteContext } from '../../../context/DiveSiteContext';

import { DeleteModalContext } from '../../../context/UserContext';





const DeleteContainer = () => {

    const [selectedSite, setSelectedSite] = useContext(SiteContext);
    //const [showForm, setShowForm] = useContext(FormContext);
    const [diveSites, setDiveSites] = useContext(DiveSitesContext);
    const loadDiveSites = useContext(LoadDiveSiteContext);
    
    const [showDeleteModal, setShowDeleteModal] = useContext(DeleteModalContext);


    

    


    const deleteSiteHandler = (event) => {
        event.preventDefault();
        console.log('Delete Confirmed');
        console.log('Deleting name ' + selectedSite.name);
        console.log('Deleting id ' + selectedSite._id);
        const siteId = selectedSite._id;

        
        fetch('http://localhost:8080/diveSites/deleteDiveSite/' + siteId, {
            method: 'DELETE'
          })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
            throw new Error('Deleting a site failed!');
            }
            return res.json();
        })
        .then(resData => {
              console.log('[resData] = ' + resData.message);
              setShowDeleteModal(false);
              loadDiveSites();
        })
        .catch(err => {
            console.log(err);
            // this.setState({ postsLoading: false });
        });
        setSelectedSite(null);
        //setShowForm(null);
    }

    const cancelDeleteHandler = (event) => {
        event.preventDefault();
        console.log('Canceled Delete');

    }

    return (
        <div className={classes.form}>
            <h1>ARE YOU SURE YOU WANT TO DELETE SITE: {/*name*/}</h1>
            <Button variant="danger" onClick={deleteSiteHandler}>Yes</Button>
            <Button variant="primary" onClick={cancelDeleteHandler}>No</Button>

        </div>
    );
};

export default DeleteContainer;
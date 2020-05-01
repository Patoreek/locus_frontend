import React, {useState, useContext} from 'react';

import { Input } from "baseui/input";
import { FormControl } from "baseui/form-control";
import { RadioGroup, Radio } from "baseui/radio";
import { Textarea } from "baseui/textarea";
import { Button } from "baseui/button";
import { FileUploader } from "baseui/file-uploader";


import {Provider as StyletronProvider} from 'styletron-react';
import {LightTheme, BaseProvider, styled} from 'baseui';
import {Client as Styletron} from 'styletron-engine-atomic';

import classes from './DeleteContainer.module.css';

import { FormContext } from '../../../context/AdminContext';
import { SiteContext,
         DiveSitesContext } from '../../../context/DiveSiteContext';

const engine = new Styletron();

const Centered = styled('div', {
    display: 'inline-block',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  });




const DeleteContainer = () => {

    const [selectedSite, setSelectedSite] = useContext(SiteContext);
    const [showForm, setShowForm] = useContext(FormContext);
    const [diveSites, setDiveSites] = useContext(DiveSitesContext);

    const siteId = selectedSite._id;

    


    const deleteSiteHandler = (event) => {
        event.preventDefault();
        console.log('Delete Confirmed');
        console.log('Deleting name ' + selectedSite.name);
        console.log('Deleting id ' + selectedSite._id);
        
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
              console.log('[resData] = ' + resData);
              setDiveSites(prevState => {
                const updatedSites = prevState.filter(s => s._id !== siteId);
                console.log('[UpdatedSites] = ' + updatedSites);
                return updatedSites;
              })
            //   this.setState(prevState => {
            //     const updatedPosts = prevState.posts.filter(p => p._id !== postId);
            //     return { posts: updatedPosts, postsLoading: false };
            //   });
        })
        .catch(err => {
            console.log(err);
            // this.setState({ postsLoading: false });
        });
        setSelectedSite(null);
        setShowForm(null);
    }

    const cancelDeleteHandler = (event) => {
        event.preventDefault();
        console.log('Canceled Delete');

    }

    return (
        <div className={classes.form}>

        <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>
        <Centered>
            <h1>ARE YOU SURE YOU WANT TO DELETE SITE: {/*name*/}</h1>
            <Button onClick={deleteSiteHandler}>Yes</Button>
            <Button onClick={cancelDeleteHandler}>No</Button>
            {/*onClick=handleEditSiteSubmit*/}

        </Centered>
        </BaseProvider>
        </StyletronProvider>
        </div>
    );
};

export default DeleteContainer;
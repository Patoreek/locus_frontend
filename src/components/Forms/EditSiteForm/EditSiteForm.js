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

import classes from './EditSiteForm.module.css';

import { SiteContext, LoadDiveSiteContext } from '../../../context/DiveSiteContext';

const engine = new Styletron();

const Centered = styled('div', {
    display: 'inline-block',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  });




const EditSiteForm = (props) => {

    const [selectedSite, setSelectedSite] = useContext(SiteContext);
    const loadDiveSites = useContext(LoadDiveSiteContext)

    const [siteName, setSiteName] = useState(selectedSite.name);
    const [siteArea, setSiteArea] = useState(selectedSite.area);
    const [siteDescription, setSiteDescription] = useState(selectedSite.description);
    const [siteType, setSiteType] = useState(selectedSite.siteType);


    const editDiveSite = (siteName, siteArea, siteDescription, siteType, siteLatitude, siteLongitude) => {
        return fetch('http://localhost:8080/diveSites/editDiveSite/' + selectedSite._id,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                diveSite: {
                    name: siteName,
                    area: siteArea,
                    latitude: siteLatitude,
                    longitude: siteLongitude,
                    description: siteDescription,
                    siteType: siteType
                }
            })
            
        })
        .then(res => {
            return res.json();
        })
        .then(result => {
            console.log(result);
            loadDiveSites();
        })
        .catch(err => {
            console.log(err);
        });
    
    }
    
    const handleEditSiteSubmit = (event) => {
        event.preventDefault();
        const name = siteName;
        const area = siteArea;
        const description = siteDescription;
        const type = siteType;
        console.log('handleEditSiteSubmit');
        editDiveSite(name, area, description, type);
    }

    return (
        <div className={classes.form}>

        <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>
        <Centered>
            <h1>EDIT A DIVE SITE</h1>
            <FormControl label={() => "Name"} >
                <Input
                    value={siteName}
                    onChange={e => setSiteName(e.target.value)}
                    placeholder="Site Name"
                    />
            </FormControl>

            <FormControl label={() => "Area"}>
                <Input 
                    value={siteArea}
                    onChange={e => setSiteArea(e.target.value)}
                    placeholder="Site Area" />
            </FormControl>

            <FormControl label={() => "Description"}>
                <Textarea
                    value={siteDescription}
                    onChange={e => setSiteDescription(e.target.value)}
                    placeholder="Enter a description about this site"
                />
            </FormControl>

            <FormControl label={() => "Dive Type"}>
                <RadioGroup
                    align="horizontal"
                    name="horizontal"
                    onChange={e => setSiteType(e.target.value)}
                    value={siteType}
                >
                    <Radio value="1">Shore</Radio>
                    <Radio value="2">Boat</Radio>
                </RadioGroup>
            </FormControl>

            <FormControl label={() => "Images"}>
            <FileUploader
                // onCancel={stopFakeProgress}
                // onDrop={(acceptedFiles, rejectedFiles) => {
                // // handle file upload...
                // startFakeProgress();
                // }}
                // progressAmount is a number from 0 - 100 which indicates the percent of file transfer completed
                // progressAmount={progressAmount}
                // progressMessage={
                // progressAmount
                //     ? `Uploading... ${progressAmount}% of 100%`
                //     : ''
                // }
            />
            </FormControl>

            <FormControl label={() => "Videos"}>
            <FileUploader
                // onCancel={stopFakeProgress}
                // onDrop={(acceptedFiles, rejectedFiles) => {
                // // handle file upload...
                // startFakeProgress();
                // }}
                // progressAmount is a number from 0 - 100 which indicates the percent of file transfer completed
                // progressAmount={progressAmount}
                // progressMessage={
                // progressAmount
                //     ? `Uploading... ${progressAmount}% of 100%`
                //     : ''
                // }
            />
            </FormControl>


            <Button onClick={handleEditSiteSubmit}>Edit</Button>


        </Centered>
        </BaseProvider>
        </StyletronProvider>
        </div>
    );
};

export default EditSiteForm;
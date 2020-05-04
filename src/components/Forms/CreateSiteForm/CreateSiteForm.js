import React, {useState, useContext} from 'react';

import axios from 'axios';

import { Input } from "baseui/input";
import { FormControl } from "baseui/form-control";
import { RadioGroup, Radio } from "baseui/radio";
import { Textarea } from "baseui/textarea";
import { Button } from "baseui/button";

import { CoordsContext } from '../../../context/DiveSiteContext';

import { AccountContext } from '../../../context/AuthContext';


import {Provider as StyletronProvider} from 'styletron-react';
import {LightTheme, BaseProvider, styled} from 'baseui';
import {Client as Styletron} from 'styletron-engine-atomic';

import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';


import classes from './CreateSiteForm.module.css';

const engine = new Styletron();

const Centered = styled('div', {
    display: 'inline-block',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  });


const createDiveSite = (siteName, siteArea, siteDescription, siteType, siteLatitude, siteLongitude, userId) => {
    
    return fetch('http://localhost:8080/diveSites/createSite',{
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
                siteType: siteType,
                userId: userId
            }
        })
    });

}


const CreateSiteForm = (props) => {

    const [coords, setCoords] = useContext(CoordsContext);

    const [account, setAccount] = useContext(AccountContext);

    const [siteName, setSiteName] = useState("");
    const [siteArea, setSiteArea] = useState("");
    const [siteDescription, setSiteDescription] = useState("");
    const [siteType, setSiteType] = useState("1");
    const [imageFiles, setImageFiles] = useState(null);

    const coordsLat = coords.lat;
    const coordsLng = coords.lng;

    
    



    const handleAddMarkerSubmit = (event) => {
        event.preventDefault();
        const name = siteName;
        const area = siteArea;
        const description = siteDescription;
        const type = siteType;
        const latitude = coordsLat;
        const longitude = coordsLng;
        const userId = account.id;

       createDiveSite(name, area, description, type, latitude, longitude, userId);
    }

    return (
        <div className={classes.form}>

        <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>
        <Centered>
            <h1>ADD A DIVE SITE</h1>
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
                <FilePond 
                    allowMultiple={true}
                    name={"images"}
                    server="http://localhost:8080/diveSites/uploadImages"
                />
            </FormControl>


            <Button onClick={handleAddMarkerSubmit}>Submit</Button>


        </Centered>
        </BaseProvider>
        </StyletronProvider>
        </div>
    );
};

export default CreateSiteForm;
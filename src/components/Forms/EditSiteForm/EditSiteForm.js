import React, {useState, useContext} from 'react';

import {
    Form,
    Col,
    Row,
    Button
} from 'react-bootstrap';

import { FilePond } from 'react-filepond';
import "filepond/dist/filepond.min.css";

import classes from './EditSiteForm.module.css';

import { SiteContext, LoadDiveSiteContext } from '../../../context/DiveSiteContext';
import { EditModalContext } from '../../../context/UserContext';





const EditSiteForm = (props) => {

    const [selectedSite, setSelectedSite] = useContext(SiteContext);
    const [showEditModal, setShowEditModal] = useContext(EditModalContext);

    const loadDiveSites = useContext(LoadDiveSiteContext)

    const [siteName, setSiteName] = useState(selectedSite.name);
    const [siteArea, setSiteArea] = useState(selectedSite.area);
    const [siteDescription, setSiteDescription] = useState(selectedSite.description);
    const [siteType, setSiteType] = useState(selectedSite.siteType);
    const [siteDepth, setSiteDepth] = useState(selectedSite.depth);

    const [commonFeatures, setCommonFeatures] = useState(selectedSite.commonFeatures);

    console.log(commonFeatures);


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
                    siteType: siteType,
                    siteDepth: siteDepth,
                    commonFeatures: commonFeatures
                }
            })
            
        })
        .then(res => {
            return res.json();
        })
        .then(result => {
            console.log(result);
            setShowEditModal(false);
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
            <h1>EDIT A DIVE SITE</h1>
            <Form>
                <Form.Row>
                    <Col>
                    <Form.Control placeholder="Name of Dive Site"
                                  value={siteName}
                                  onChange={e => setSiteName(e.target.value)} />
                    </Col>
                    <Col>
                    <Form.Control placeholder="Area / Suburb"
                                  value={siteArea}
                                  onChange={e => setSiteArea(e.target.value)} />
                    </Col>
                </Form.Row>
                    <Form.Control as="textarea"
                                  rows="10"
                                  value={siteDescription}
                                  placeholder="Description of site"
                                  onChange={e => setSiteDescription(e.target.value)} />
                <Form.Row>
                <Form.Row>
                    <Col>
                    <Form.Control placeholder="Max Depth of Site"
                                  value={siteDepth}
                                  onChange={e => setSiteDepth(e.target.value)} />
                    </Col>
                </Form.Row>
                    
                </Form.Row>
                <Form.Row>
                <Form.Check inline 
                            type="radio" 
                            aria-label="shore" 
                            label="Shore Dive" 
                            name="siteType" 
                            value={siteType} 
                            onChange={e => setSiteType("1")}
                            checked={siteType == 1}
                />
                <Form.Check inline 
                            type="radio" 
                            aria-label="boat" 
                            label="Boat Dive" 
                            name="siteType" 
                            value={siteType} 
                            onChange={e => setSiteType("2")}
                            checked={siteType == 2}
                />
            </Form.Row>
            
            {/* <FilePond 
                    allowMultiple={false}
                    name={"divesiteImages"}
                    server={
                        {
                            url: "http://localhost:8080/diveSites/uploadImages/" + selectedSite._id,
                            process:{
                                withCredentials: true
                            }
                        }
                    }
                /> */}
            <Form.Row>
                <Button variant="primary" type="submit" onClick={(e) => handleEditSiteSubmit(e)}>
                    Submit
                </Button>
            </Form.Row>
        </Form>

        </div>
    );
};

export default EditSiteForm;
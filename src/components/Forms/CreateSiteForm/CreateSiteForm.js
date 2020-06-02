import React, {useState, useContext} from 'react';

import { 
        Form,
        Button,
        Row,
        Col
        } from 'react-bootstrap';

import { CoordsContext,
         LoadDiveSiteContext } from '../../../context/DiveSiteContext';
import { AccountContext } from '../../../context/AuthContext';

import { AddModalContext } from '../../../context/UserContext';






import classes from './CreateSiteForm.module.css';





const CreateSiteForm = (props) => {

    const [coords, setCoords] = useContext(CoordsContext);
    const [account, setAccount] = useContext(AccountContext);
    const loadDiveSites = useContext(LoadDiveSiteContext);
    const [showAddModal, setShowAddModal] = useContext(AddModalContext);


    const [siteName, setSiteName] = useState("");
    const [siteArea, setSiteArea] = useState("");
    const [siteDescription, setSiteDescription] = useState("");
    const [siteType, setSiteType] = useState("1");
    const [imageFiles, setImageFiles] = useState(null);

    const coordsLat = coords.lat;
    const coordsLng = coords.lng;

    const createDiveSite = (siteName, siteArea, siteDescription, siteType, siteLatitude, siteLongitude, userId, loadDiveSites) => {


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
        })
        .then(res => {
            return res.json();
        })
        .then(result => {
            console.log(result);
            setShowAddModal(false);
            loadDiveSites();
        })
        .catch(err => {
            console.log(err);
        });
    }


    const handleAddMarkerSubmit = (event) => {
        event.preventDefault();
        const name = siteName;
        const area = siteArea;
        const description = siteDescription;
        const type = siteType;
        const latitude = coordsLat;
        const longitude = coordsLng;
        const userId = account.id;

     


        createDiveSite(name, area, description, type, latitude, longitude, userId, loadDiveSites, setShowAddModal);
    }

    return (
            <Form>
                <Form.Row className={classes.formRow}>
                    <Col>
                    <Form.Control placeholder="Name of Dive Site" 
                                  onChange={e => setSiteName(e.target.value)} />
                    </Col>
                    <Col>
                    <Form.Control placeholder="Area / Suburb"
                                  onChange={e => setSiteArea(e.target.value)} />
                    </Col>
                </Form.Row>
                <Form.Row className={classes.formRow}>
                    <Col>
                    <Form.Control as="textarea"
                                  rows="3"
                                  placeholder="Description of site"
                                  onChange={e => setSiteDescription(e.target.value)} />
                    </Col>
                    
                </Form.Row>
                <Form.Row  className={classes.formRow}>
                <Col>
                    <Form.Group controlId="formBasicRadiobox">
                        <h3 className={classes.diveTypeHeader}> Dive Type </h3>
                        <Form.Check inline 
                                    type="radio" 
                                    aria-label="shore" 
                                    label="Shore Dive" 
                                    name="siteType" 
                                    value="1" 
                                    onChange={e => setSiteType(e.target.value)} 
                        />
                        <Form.Check inline 
                                    type="radio" 
                                    aria-label="boat" 
                                    label="Boat Dive" 
                                    name="siteType" 
                                    value="2"  
                                    onChange={e => setSiteType(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                </Form.Row>
            <Form.Row className={classes.formRow}>
                <Col>
                <Button variant="primary" type="submit" onClick={(e) => handleAddMarkerSubmit(e)}>
                    Submit
                </Button>
                </Col>
            </Form.Row>
        </Form>
    );
};

export default CreateSiteForm;
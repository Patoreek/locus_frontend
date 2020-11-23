import React, {useState, useEffect, useContext} from 'react';

import { Form,
         Row,
         Col,
         Button,
         Table } from 'react-bootstrap';

import { SiteContext } from '../../../../context/DiveSiteContext';

import classes from './CommonFeatures.module.scss';

const CommonFeatures = () => {

    const [featureType, setFeatureType] = useState('Animal');
    const [featureName, setFeatureName] = useState(null);

    const [ selectedSite, setSelectedSite ] = useContext(SiteContext);

    useEffect(() => {
        // GET FEATURES FOR DIVE SITE
        // DISPLAY THEM IN TABLE
    }, []);


    const handleAddFeature = () => {

        console.log('The type is: ' + featureType);
        console.log('The name is: ' + featureName);

        async function addFeature() {
            const response = await fetch('http://localhost:8080/diveSites/addFeature',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                       featureType: featureType,
                       featureName: featureName,
                       siteId: selectedSite._id
                })
            });
            const data = await response.json();
            console.log(data);
            setSelectedSite(data.updatedSite);
            // const sites = data.site;
            // setDiveSites(sites);
            // return true;
        }

        addFeature();


    }   


    const handleRemoveFeature = (feature) => {

        console.log('The type is: ' + featureType);
        console.log('The name is: ' + featureName);
        console.log('featureId = ' + feature._id);

        async function addFeature() {
            const response = await fetch('http://localhost:8080/diveSites/deleteFeature',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                       featureId: feature._id,
                       siteId: selectedSite._id
                })
            });
            const data = await response.json();
            console.log(data);
            //setSelectedSite(data.updatedSite);
            // const sites = data.site;
            // setDiveSites(sites);
            // return true;
        }

        addFeature();


    }   




    return (
        <div>
        {/* <h1 className={classes.tabHeader}> Common Features Added here</h1> */}
        <Table striped bordered hover>
        <thead>
            <tr>
            <th>Type</th>
            <th colSpan="2">Name</th>
            <th>Options</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td>
                <Form.Control as="select" 
                              onChange={(e) => {
                                    setFeatureType(e.target.value);
                                    
                                }}>
                                <option value="Animal">Animal</option>
                                <option value="Plant" >Plant</option>
                                <option value="Object">Object</option>
                                <option value="Structure">Structure</option>
                </Form.Control>
            </td>
            <td colSpan="2">
                <Form.Control placeholder="Name"
                                  value={featureName}
                                  onChange={e => setFeatureName(e.target.value)}
                    />
            </td>
            <td><Button variant="success" onClick={handleAddFeature}> + </Button></td>
            </tr>
            {selectedSite.commonFeatures.map(feature => (
                <tr>
                    <td>{feature.featureType}</td>
                    <td colSpan="2">{feature.name}</td>
                    <td><Button variant="danger" onClick={() => handleRemoveFeature(feature)}> - </Button></td>
                </tr>
            ))}
        </tbody>
        </Table>
        </div>
    );
};

export default CommonFeatures;
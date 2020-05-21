import React, {useState, useEffect, useContext} from 'react';

import { Form,
         Row,
         Col,
         Button,
         Table } from 'react-bootstrap';

import { SiteContext } from '../../../../context/DiveSiteContext';

const CommonFeatures = () => {

    const [featureType, setFeatureType] = useState(null);
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
            // const data = await response.json();
            // const sites = data.site;
            // setDiveSites(sites);
            // return true;
        }

        addFeature();


    }   


    const handleRemoveFeature = () => {

        console.log('The type is: ' + featureType);
        console.log('The name is: ' + featureName);
    }   




    return (
        <div>

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
            <tr>
            <td>Animal</td>
            <td colSpan="2">Cuttlefish</td>
            <td><Button variant="danger" onClick={handleRemoveFeature}> - </Button></td>
            </tr>
            <tr>
            <td>Animal</td>
            <td colSpan="2">Grey Nurse Shark</td>
            <td><Button variant="danger"> - </Button></td>
            </tr>
        </tbody>
        </Table>
        </div>
    );
};

export default CommonFeatures;
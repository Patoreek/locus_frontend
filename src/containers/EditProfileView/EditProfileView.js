import React, {useEffect, useState, useContext} from 'react';

import { useHistory } from 'react-router-dom';


import { FilePond } from 'react-filepond';
import "filepond/dist/filepond.min.css";


import { Form,
         Col,
         Button } from 'react-bootstrap';

import { AccountContext } from '../../context/AuthContext';

import classes from './EditProfileView.module.css';



const EditProfileView = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [bio, setBio] = useState("");
    const [location, setLocation] = useState("");
    const [licenseType, setLicenseType] = useState("");
    const [profilePic, setProfilePic] = useState("");

    const [account, setAccount] = useContext(AccountContext);

    let history = useHistory();

    useEffect(() => {
        async function getProfile() {

                    try {
                        const response = await fetch('http://localhost:8080/user/getProfile',{
                            method: 'GET',
                            credentials: 'include',
                        });
                        const profile = await response.json();
                        console.log(profile);
                        setFirstName(profile.firstName);
                        setLastName(profile.lastName);
                        setProfilePic(profile.profilePic);
                        setBio(profile.bio);
                        setLocation(profile.location);
                        setLicenseType(profile.licenseType);
                    } catch (error) {
                    console.log(error);
                    //setIsLoading(null);
                    }
        }
        getProfile();
    }, []);

    const cancelHandler = () => {
        console.log('Cancel presesd');
        history.push("/profile");
    }

    const editProfileHandler = () => {
        console.log('First Name: ' + firstName);
        console.log('Last Name: ' + lastName);
        console.log('Profile Picture: ' + profilePic);
        console.log('Bio: ' + bio);
        console.log('Location: ' + location);
        console.log('License Type: ' + licenseType);




        return fetch('http://localhost:8080/user/editProfile',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                bio: bio,
                location: location,
                licenseType: licenseType 
        })
        })
        .then(res => {
            return res.json();
        })
        .then(result => {
            console.log(result);
            
        })
        .catch(err => {
            console.log(err);
        });
        
    }

    return (
        <div>
            <div className={classes.editProfileContainer}>
            
            <Form className={classes.formContainer}>
                    <h1 className={classes.formHeader}>Edit Profile</h1>
                    <Form.Row className={classes.formRow}>
                        <Col className={classes.formCol}>
                        <Form.Label className={classes.label}>First Name</Form.Label>
                        <Form.Control placeholder="First Name" 
                                    onChange={e => setFirstName(e.target.value)}
                                    value={firstName}
                                    className={classes.formInput} />
                        </Col>
                        <Col className={classes.formCol}>
                        <Form.Label className={classes.label}>Last Name</Form.Label>
                        <Form.Control placeholder="Last Name"
                                    onChange={e => setLastName(e.target.value)}
                                    value={lastName}
                                    className={classes.formInput} />
                        </Col>
                    </Form.Row>
                    <Form.Row className={classes.formRow}>
                        <Col className={classes.formCol}>
                            <Form.Label className={classes.label}>Bio</Form.Label>
                                <Form.Control as="textarea"
                                            rows="10"
                                            placeholder="Bio"
                                            onChange={e => setBio(e.target.value)}
                                            value={bio}
                                            className={classes.formTextArea} />
                        </Col>
                    </Form.Row>
                    <Form.Row className={classes.formRow}>
                        <Col className={classes.formCol}>
                        <Form.Label className={classes.label}>Location</Form.Label>
                            <Form.Control placeholder="Where are you from?"
                                        onChange={e => setLocation(e.target.value)} 
                                        value={location}
                                        className={classes.formInput}/>
                        </Col>
                        <Col className={classes.formCol}>
                        <Form.Label className={classes.label}>License Type</Form.Label>
                            <Form.Control placeholder="License Type"
                                        onChange={e => setLicenseType(e.target.value)}
                                        value={licenseType}
                                        className={classes.formInput} />
                        </Col>
                    </Form.Row>
                        <Form.Label className={classes.labelImages}>Upload Images</Form.Label>
                        <FilePond 
                            className={classes.filePond}
                            allowMultiple={false}
                            name={"profilePicture"}
                            server={
                                {
                                    url: "http://localhost:8080/user/uploadImages/" + account.id,
                                    process:{
                                        withCredentials: true
                                    }
                                }
                            }
                        />
                
                <Button variant="primary"
                        type="submit"
                        className={classes.editButton}
                        onClick={(e) => editProfileHandler(e)}>
                    Edit
                </Button>

                <Button variant="secondary"
                        className={classes.editButton}
                        onClick={cancelHandler}>
                    Cancel
                </Button>
            </Form>

            </div>
        </div>
    );
};

export default EditProfileView;
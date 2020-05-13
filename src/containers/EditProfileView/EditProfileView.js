import React, {useEffect, useState} from 'react';

import {Provider as StyletronProvider} from 'styletron-react';
import {LightTheme, BaseProvider, styled} from 'baseui';
import {Client as Styletron} from 'styletron-engine-atomic';

import { Input } from "baseui/input";
import { FormControl } from "baseui/form-control";
import { RadioGroup, Radio } from "baseui/radio";
import { Textarea } from "baseui/textarea";
import { Button } from "baseui/button";

import classes from './EditProfileView.module.css';

const engine = new Styletron();

const Centered = styled('div', {
    display: 'inline-block',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  });

const EditProfileView = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [bio, setBio] = useState("");
    const [location, setLocation] = useState("");
    const [licenseType, setLicenseType] = useState("");
    const [profilePic, setProfilePic] = useState("");

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
            profile: {
                firstName: firstName,
                lastName: lastName,
                profilePic: profilePic,
                bio: bio,
                location: location,
                licenseType: licenseType
                
            }
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
            <h1>Edit Profile</h1>
            
            <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>
        <Centered>
            <FormControl label={() => "First Name"} >
                <Input
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    placeholder="First Name"
                    />
            </FormControl>

            <FormControl label={() => "Last Name"}>
                <Input 
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    placeholder="Last Name" />
            </FormControl>

            <FormControl label={() => "Profile Picture"}>
                <Textarea
                    value={profilePic}
                    onChange={e => setProfilePic(e.target.value)}
                    placeholder="Picture will be uploaded here"
                />
            </FormControl>

            <FormControl label={() => "Bio"}>
                <Textarea
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    placeholder="Tell us something about yourself"
                />
            </FormControl>


            <FormControl label={() => "Location"}>
                <Textarea
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="Where are you from?"
                />
            </FormControl>

            <FormControl label={() => "License Type"}>
                <Input
                    value={licenseType}
                    onChange={e => setLicenseType(e.target.value)}
                    placeholder="Where are you from?"
                />
            </FormControl>




            <Button onClick={editProfileHandler}>Edit</Button>


        </Centered>
        </BaseProvider>
        </StyletronProvider>

        </div>
    );
};

export default EditProfileView;
import React, {useEffect, useState, useContext} from 'react';

import { useHistory } from 'react-router-dom';


import { FilePond } from 'react-filepond';
import "filepond/dist/filepond.min.css";


import { Form,
         Col,
         Button } from 'react-bootstrap';

import { AccountContext } from '../../context/AuthContext';

import classes from './EditProfileView.module.scss';



const EditProfileView = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [bio, setBio] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [experience, setExperience] = useState("");
    const [success, setSuccess] = useState(null);

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
                        setCity(profile.city);
                        setCountry(profile.country);
                        setExperience(profile.experience);
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
        //console.log('Profile Picture: ' + profilePic);
        console.log('Bio: ' + bio);
        console.log('city: ' + city);
        console.log('country: ' + country);
        console.log('experience: ' + bio);

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
                city: city,
                country: country,
                experience: experience,
                })
        })
        .then(res => {
            return res.json();
            
        })
        .then(result => {
            console.log(result);
            setSuccess('true');
        })
        .catch(err => {
            console.log(err);
            setSuccess('false');

        });
        
    }

    return (
        <div>
            {/* IF showDeleteModal is false then show edit modal */}
                <div className={classes.form}>
                    <div className={classes.form__backBtnContainer}>
                        <span className={classes.backBtn} onClick={cancelHandler}>Back to Profile</span>
                    </div>
                    <div className={classes.form__headerContainer}>
                        <h3 className={classes.header}>Edit Profile</h3>
                    </div>
                    <div className={classes.form__firstNameContainer}>
                        <input  className={`${classes.input} ${classes.input__firstName}`}
                                placeholder="First name"
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)} />
                    </div>
                    
                    <div className={classes.form__lastNameContainer}>
                        <input className={`${classes.input} ${classes.input__lastName}`}
                                placeholder="Area / Suburb"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)} />
                    </div>
                    <div className={classes.form__cityContainer}>
                        <input className={`${classes.input} ${classes.input__city}`}
                                placeholder="City"
                                value={city}
                                onChange={e => setCity(e.target.value)} />
                    </div>
                    <div className={classes.form__countryContainer}>
                        <input className={`${classes.input} ${classes.input__country}`}
                                placeholder="Country"
                                value={country}
                                onChange={e => setCountry(e.target.value)} />
                    </div>
                    <div className={classes.form__uploadContainer}>
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
                    </div>
                  

                    <div className={classes.form__bioContainer}>
                        <textarea className={`${classes.input} ${classes.input__bio}`}
                                    rows="10"
                                    value={bio}
                                    placeholder="Bio"
                                    onChange={e => setBio(e.target.value)} />
                    </div>


                    <div className={classes.form__experienceContainer}>
                        <input className={`${classes.input} ${classes.input__experience}`}
                                placeholder="Experience"
                                value={experience}
                                onChange={e => setExperience(e.target.value)} />
                    </div>
                
        
                    <div className={classes.form__cancelBtnContainer}>
                        <button className={classes.cancelBtn} onClick={cancelHandler}>Cancel</button>
                    </div>

                    <div className={classes.form__editBtnContainer}>
                        <input
                                placeholder="Edit"
                                type="submit"
                                onClick={(e) => editProfileHandler(e)}
                                className={classes.editBtn}/>
                                
                    </div>

                    <div className={classes.form__messageContainer}>
                        {success === 'true' ? <p className={classes.successMsg}>Changes saved successfully</p> : null }
                        {success === 'false' ? <p className={classes.errorMsg}>Whoops! Something went wrong!</p> : null }
                                
                    </div>

                  </div>
        </div>
    );
};

export default EditProfileView;
import React, {useEffect, useContext, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext, LoadingContext } from '../../context/AuthContext';

const ProfileView = () => {

    const [isAuth, setIsAuth] = useContext(AuthContext);
    const [isLoading, setIsLoading] = useContext(LoadingContext);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [bio, setBio] = useState("");
    const [location, setLocation] = useState("");
    const [licenseType, setLicenseType] = useState("");
    const [profilePic, setProfilePic] = useState("");

    let history = useHistory();

        if (!isAuth){
            history.replace('/login');
        }
    
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
  


    return (
        <div>
            <h1>Profile Section</h1>
            <a href="/editprofile">Edit profile</a>
            <h1>{firstName} {lastName}</h1>
            <h3>{location}</h3>
            <h4>{licenseType}</h4>
            <p>{bio}</p>
            <p>{profilePic}</p>
        </div>
    );
};

export default ProfileView;
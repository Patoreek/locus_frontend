import React, {useEffect, useContext, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const ViewProfileView = (props) => {

    const [isAuth, setIsAuth] = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [bio, setBio] = useState("");
    const [location, setLocation] = useState("");
    const [licenseType, setLicenseType] = useState("");
    const [profilePic, setProfilePic] = useState("");

    let history = useHistory();
    
        useEffect(() => {
            async function getProfile() {
                const userId = props.match.params.profileId;
                        try {
                            const response = await fetch('http://localhost:8080/user/viewProfile',{
                                method: 'POST',
                                credentials: 'include',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    userId: userId
                                })
                            });
                            const profile = await response.json();
                            console.log(profile);
                            setFirstName(profile.firstName);
                            setLastName(profile.lastName);
                            setProfilePic('http://localhost:8080/' + profile.profilePic);
                            setBio(profile.bio);
                            setLocation(profile.location);
                            setLicenseType(profile.licenseType);
                            
                            setIsLoading(false);
                        } catch (error) {
                        console.log(error);
                        setIsLoading(null);
                        }
            }
            getProfile();
        }, []);


    return (
        <div>
            <h1>View Other User Profile Section</h1>
            {!isLoading && (
                <div>  
                    <h1>{firstName} {lastName}</h1>
                    <h3>{location}</h3>
                    <h4>{licenseType}</h4>
                    <p>{bio}</p>
                    <img src={profilePic}/>
                </div>
            )}
            {isLoading && (
                <h1> Loading...</h1>
            )}
            
            
        </div>
    );
};

export default ViewProfileView;
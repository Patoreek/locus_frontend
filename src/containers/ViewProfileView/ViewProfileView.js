import React, {useEffect, useContext, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

import classes from './ViewProfileView.module.css';

const ViewProfileView = (props) => {

    const [isAuth, setIsAuth] = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [bio, setBio] = useState("");
    const [location, setLocation] = useState("");
    const [licenseType, setLicenseType] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [favourites, setFavourites] = useState([]);

    let history = useHistory();

    const siteLinkHandler = (site) => {
        console.log('Site Name Pressed!');
        console.log(site);
        // setSelectedSite(site);
        // setMoreDetails(!moreDetails);
    }
    
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
                            setFavourites(profile.favouritesData);

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
            {/* {!moreDetails && ( */}
            <div className={classes.profileContainer}>
                {!isLoading && (
                    <div>
                        <div className={classes.coverPhotoContainer}>
                            <div className={classes.profilePictureContainer}>
                                <img src={profilePic} className={classes.profilePicture}/> 
                            </div>
    
                            <div className={classes.profileNameContainer}>
                                <p className={classes.profileName}>{firstName} {lastName}</p>
                            </div>
                        </div>
    
                        <div className={classes.profileLocationContainer}>
                            <p className={classes.profileLocation}>{location}</p>
                        </div>
                        <div className={classes.profileSpanContainer}>
                            <p className={classes.profileSpan}>|</p>
                        </div>
    
                        <div className={classes.profileLicenseContainer}>
                            <p className={classes.profileLicense}>{licenseType}</p>
                        </div>
    
                        <div className={classes.hrContainer}>
                            <hr/>
                        </div>
    
                        <div className={classes.profileBioContainer}>
                            <h3 className={classes.profileBioHeader}>Bio</h3>
                            <p className={classes.profileBio}>{bio}</p>
                        </div>
    
                        <div className={classes.profileFavContainer}>
                            <div className={classes.profileFavHeaderContainer}>
                                <h3 className={classes.profileFavHeader}>{firstName}'s Favourites</h3>
                            </div>
                            <div className={classes.favouritesContainer}>
                                {favourites.map(favourite => (
                                    <div className={classes.favouriteContainer}>
                                        <p className={classes.siteHeader}
                                            onClick={() => siteLinkHandler(favourite.site)}>
                            
                                            {favourite.siteName}, {favourite.siteArea}
                                        
                                        </p>
                                        {/* <p>{favourite.siteId}</p> */}
                                        {/* <p>{favourite.siteDescription}</p> */}
                                        <img src={'http://localhost:8080/' + favourite.siteImage} className={classes.favouritePicture}/> 
                                    </div>
                                ))}
                            </div>
      
                        </div>
    
                    </div>
                )}
                {isLoading && (
                    <h1> Loading...</h1>
                )}
            </div>
            {/* {moreDetails && (
            <Details/>
            )} */}
            </div>
    
                
                
    
        );
};

export default ViewProfileView;
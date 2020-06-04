import React, {useEffect, useContext, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext, LoadingContext } from '../../context/AuthContext';
import { SiteContext, DetailsContext } from '../../context/DiveSiteContext';

import Details from '../DetailsView/DetailsView';

import classes from './ProfileView.module.css';

const ProfileView = () => {

    const [isAuth, setIsAuth] = useContext(AuthContext);
    const [ selectedSite, setSelectedSite ] = useContext(SiteContext);
    const [moreDetails, setMoreDetails] = useContext(DetailsContext);


    const [isLoading, setIsLoading] = useState(true);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [bio, setBio] = useState("");
    const [location, setLocation] = useState("");
    const [licenseType, setLicenseType] = useState("");
    const [profilePic, setProfilePic] = useState("");

    const [favourites, setFavourites] = useState([]);

    let history = useHistory();

        if (!isAuth){
            history.replace('/login');
        }

        const siteLinkHandler = (site) => {
            console.log('Site Name Pressed!');
            console.log(site);
            setSelectedSite(site);
            setMoreDetails(!moreDetails);
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
        {!moreDetails && (
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

                    <div className={classes.profileEditContainer}>
                        <a href="/editprofile">Edit profile</a>
                    </div>

                    <div className={classes.hrContainer}>
                        <hr  className={classes.hr}/>
                    </div>

                        <div className={classes.profileBioContainer}>
                            <h3 className={classes.profileBioHeader}>Bio</h3>
                            <p className={classes.profileBio}>{bio}</p>
                        </div>

                        <div className={classes.profileFavContainer}>
                    
                                <h3 className={classes.profileFavHeader}>{firstName}'s Favourites</h3>
            
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
        )}
        {moreDetails && (
        <Details/>
        )}
        </div>

            
            

    );
};

export default ProfileView;
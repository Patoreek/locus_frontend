import React, {useEffect, useContext, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext, LoadingContext } from '../../context/AuthContext';
import { SiteContext, DetailsContext } from '../../context/DiveSiteContext';

import Details from '../DetailsView/DetailsView';

import Spinner from 'react-bootstrap/Spinner';

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
        <div className={classes.profilePage}>
        {!moreDetails && (
        <div className={classes.profilePageContainer}>
            {!isLoading && (
                <div>
                    <div className={classes.coverPhotoContainer}>
                       
                    </div>

                    <div className={classes.topHalfContainer}>

                         <div className={classes.profilePictureContainer}>
                            <div className={classes.overlayDiv}></div>
                            <img src={profilePic} className={classes.profilePicture}/> 
                        </div>

                        <div className={classes.profileNameContainer}>
                            <h3 className={classes.profileName}>{firstName} {lastName}</h3>
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
                            <a href="/editprofile" className={classes.profileEdit}>Edit profile</a>
                        </div>
                    </div>


                   
                

                        <div className={classes.profileBioContainer}>
                            <div className={classes.profileBioHeaderContainer}>
                                <h3 className={classes.profileBioHeader}>Bio</h3>
                            </div>
                            <p className={classes.profileBio}>{bio}</p>
                        </div>

                    
                        <div className={classes.profileFavContainer}>

                            <div className={classes.profileFavHeaderContainer}>
                                <h3 className={classes.profileFavHeader}>{firstName}'s Favourites</h3>
                            </div>
            
                            <div className={classes.favouritesContainer}>
                                {favourites.map(favourite => (
                                    <div className={classes.favouriteContainer}>

                                        <div className={classes.siteHeaderContainer}>
                                            <h3 className={classes.siteHeader}
                                                onClick={() => siteLinkHandler(favourite.site)}>
                                
                                                {favourite.siteName}, {favourite.siteArea}
                                            
                                            </h3>
                                        </div>

                                        <div className={classes.siteImageContainer}>

                                            <img src={'http://localhost:8080/' + favourite.siteImage} 
                                                className={classes.siteImage}
                                            />
                                        </div>



                                    </div>
                                ))}
                            </div>
    
                        </div> 

                </div>
            )}
            {isLoading && (
                <Spinner animation="border" />
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
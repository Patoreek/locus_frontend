import React, {useEffect, useContext, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext, LoadingContext } from '../../context/AuthContext';
import { SiteContext, DetailsContext } from '../../context/DiveSiteContext';

import { ReactComponent as PinSVG } from '../../assets/icons/pin.svg';
import { ReactComponent as XpSVG } from '../../assets/icons/experience.svg';

import Details from '../DetailsView/DetailsView';

import Spinner from 'react-bootstrap/Spinner';

import StarRating from '../../components/StarRating/StarRating';
import FavouriteButton from '../../components/Buttons/FavouriteButton/FavouriteButton';

import classes from './ProfileView.module.scss';

const ProfileView = () => {

    const [isAuth, setIsAuth] = useContext(AuthContext);
    const [ selectedSite, setSelectedSite ] = useContext(SiteContext);
    //const [moreDetails, setMoreDetails] = useContext(DetailsContext);


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

        // const siteLinkHandler = (site) => {
        //     console.log('Site Name Pressed!');
        //     console.log(site);
        //     setSelectedSite(site);
        //     setMoreDetails(!moreDetails);
        // }
    
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
            {!isLoading && (
                <div className={classes.profilePage}>
                    <div className={classes.profile}>
                        <div className={classes.profileLeft}>
                            <div className={classes.profileLeft__pictureContainer}>
                                <img src={profilePic} className={classes.picture}/> 
                            </div>
                        </div>

                        <div className={classes.profileRight}>
                            <div className={classes.profileRight__nameContainer}>
                                <h3 className={classes.name}>{firstName} {lastName}</h3>
                            </div>

                            <div className={classes.profileRight__bioContainer}>   
                                <p className={classes.bio}>{bio}</p>
                            </div>

                            <div className={classes.profileRight__locationContainer}>
                                <PinSVG className={classes.icon}/>
                                <p className={classes.location}>{location}</p> {/* Change this to City, Country */}
                            </div>

                            <div className={classes.profileRight__experienceContainer}>
                                <XpSVG className={classes.icon}/>
                                <p className={classes.experience}>{licenseType}</p>
                            </div>

                            <div className={classes.profileRight__editContainer}>
                                <a href="/editprofile" className={classes.edit}>Edit profile</a>
                            </div>
                        </div>

                        
                    </div>

                    <div className={classes.reportsContainer}>
                        <h3>Dive Reports (999+)</h3>
                        <div className={classes.report}>
                            <h3> Under Construction</h3>
                        </div>
                    </div>
                    
                    <div className={classes.favouritesContainer}>
                        <h3 className={classes.header}>{firstName}'s Favourites</h3>
                        <div className={classes.favourites}>
                            {favourites.map(favourite => (
                                <div className={classes.favouriteContainer}>

                                    <div className={classes.favouriteContainer__imageContainer}>

                                        <img src={'http://localhost:8080/' + favourite.siteImage} 
                                        className={classes.image}
                                        />
                                    </div>
                                    <div className={classes.favouriteContainer__pointContainer}>
                                        <span className={classes.point}>Shore Dive · Great for Scuba</span>
                                    </div>
                                    <div className={classes.favouriteContainer__nameContainer}>
                                        <span className={classes.name}>{favourite.siteName}, {favourite.siteArea}</span>
                                    </div>
                                    
                                    <div className={classes.favouriteContainer__descriptionContainer}>
                                        <span className={classes.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
                                    </div>
                                    <div className={classes.favouriteContainer__ratingContainer}>
                                        <div className={classes.rating}>
                                            <StarRating site={favourite}/>
                                        </div>
                                    </div>
                                    <div className={classes.favouriteContainer__moreContainer}>
                                        <a href="#" className={classes.more}>More...</a>
                                    </div>
                                </div>
                            ))}
                        </div>

                        
                    </div> 

                </div>
            )}
            
        </div>

            
            

    );
};

export default ProfileView;
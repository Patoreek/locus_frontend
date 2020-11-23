import React, {useEffect, useContext, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext, LoadingContext, AuthDrawerContext, AccountContext } from '../../context/AuthContext';
import { SiteContext, DetailsContext } from '../../context/DiveSiteContext';

import { ReactComponent as PinSVG } from '../../assets/icons/location_grey.svg';
import { ReactComponent as XpSVG } from '../../assets/icons/experience.svg';

import Details from '../DetailsView/DetailsView';

import Spinner from 'react-bootstrap/Spinner';

import StarRating from '../../components/StarRating/StarRating';
import FavouriteButton from '../../components/Buttons/FavouriteButton/FavouriteButton';
import DisplayReport from '../../components/DisplayReport/DisplayReport';

import DivesiteListing from '../../components/Divesite/DivesiteListing/DivesiteListing';

import classes from './ProfileView.module.scss';

const ProfileView = () => {

    const [isAuth, setIsAuth] = useContext(AuthContext);
    const [ selectedSite, setSelectedSite ] = useContext(SiteContext);
    const [ authDrawer, setAuthDrawer ] = useContext(AuthDrawerContext);
    const [account, setAccount] = useContext(AccountContext);

    //const [moreDetails, setMoreDetails] = useContext(DetailsContext);


    const [isLoading, setIsLoading] = useState(true);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [bio, setBio] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [experience, setExperience] = useState("");
    const [profilePic, setProfilePic] = useState("");

    const [favourites, setFavourites] = useState([]);

    const [reports, setReports] = useState([]);

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
                    console.log('getting profile...');
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
                            setCity(profile.city);
                            setCountry(profile.country);
                            setExperience(profile.experience);
                            setFavourites(profile.favouritesData);
                            setIsLoading(false);
                        } catch (error) {
                        console.log(error);
                        setIsLoading(null);
                        }
            }

            async function getReports() {
    
                try {
                    const response = await fetch('http://localhost:8080/user/diveReports/getReportsForUser/' + account.id,{
                        method: 'GET',
                        credentials: 'include',
                    });
                    const reports = await response.json();
                    console.log('GOT REPORTS...');
                    console.log(reports);
                    setReports(reports.reportsData);
                 
                } catch (error) {
                console.log(error);
                setIsLoading(null);
                }
            }
            
            
            getReports();
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
                                <PinSVG className={classes.iconPin}/>
                                <p className={classes.location}>{city}, {country}</p> {/* Change this to City, Country */}
                            </div>

                            <div className={classes.profileRight__experienceContainer}>
                                <XpSVG className={classes.icon}/>
                                <p className={classes.experience}>{experience}</p>
                            </div>

                            <div className={classes.profileRight__editContainer}>
                                <a href="/editprofile" className={classes.edit}>Edit profile</a>
                                <a href="/changePassword" className={classes.changePw}>Change Password</a>
                            </div>
                        </div>

                        
                    </div>

                    
                        {reports != [] && (
                            <div className={classes.reportsContainer}>
                                <h4>Dive Reports ({reports.length})</h4>
                                {reports.map(report => (
                                    <DisplayReport report={report}/>
                                ))}
                            </div>
                        )}    
                         {reports.length == 0 && (
                            <div className={classes.reportsContainer}>
                                <h4>Dive Reports (0)</h4>
                                    <div className={classes.noReports}>
                                        <h3>There are currently no dive reports for this location.</h3>
                                        {isAuth ? 
                                            <a href="#">Add a Dive Report</a> : 
                                            <span onClick={() =>  
                                                setAuthDrawer({
                                                    open: true,
                                                    login: true,
                                                    signup: false
                                                })}>Log in
                                            </span>
                                        }
                                    </div>
                            </div>
                        )}
               
                    
                    <div className={classes.favouritesContainer}>
                        <h3 className={classes.header}>{firstName}'s Favourites</h3>
                        <div className={classes.favourites}>
                            {favourites.map(favourite => (
                                <DivesiteListing site={favourite}/>
                                
                            ))}
                        </div>

                        
                    </div> 

                </div>
            )}
            
        </div>

            
            

    );
};

export default ProfileView;
import React, {useEffect, useContext, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext, LoadingContext, AuthDrawerContext, AccountContext } from '../../context/AuthContext';
import { SiteContext, DetailsContext } from '../../context/DiveSiteContext';

import { ReactComponent as PinSVG } from '../../assets/icons/location_grey.svg';
import { ReactComponent as XpSVG } from '../../assets/icons/experience.svg';

import StarRating from '../../components/StarRating/StarRating';
import FavouriteButton from '../../components/Buttons/FavouriteButton/FavouriteButton';
import DisplayReport from '../../components/DisplayReport/DisplayReport';

import classes from './ViewProfileView.module.scss';

const ViewProfileView = (props) => {

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
    
        useEffect(() => {
            const userId = props.match.params.userId;

            const getProfile = () => {
                return fetch('http://localhost:8080/user/viewProfile',{
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: userId
                    })
                })
                .then(res => {
                    return res.json();
                })
                .then(profile => {
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
                    
                })
                .catch(err => {
                    console.log('Caught.');
                    console.log(err);
                    // history.push("/login");
                });

            }

            async function getReports() {
    
                try {
                    const response = await fetch('http://localhost:8080/user/diveReports/getReportsForUser/' + userId,{
                        method: 'GET',
                        credentials: 'include',
                    });
                    const reports = await response.json();
                    console.log('GOT REPORTS...');
                    console.log(reports);
                    setReports(reports.reportsData);
                 
                } catch (error) {
                console.log(error);
                console.log("Did not get reports for this user...");
                setIsLoading(null);
                }
            }

            getProfile();
            getReports();
            

            
            
          
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
                                        <h3>This user has not posted any dive reports yet...</h3>
                         <p className={classes.subHeader_noReports}>Visit {firstName} later to see if he has added any new dive reports!</p>
                                    </div>
                            </div>
                        )}
               
                    
                    <div className={classes.favouritesContainer}>
                        <h3 className={classes.header}>{firstName}'s Favourites</h3>
                        <div className={classes.favourites}>
                            {favourites.map(favourite => (
                                <div className={classes.favouriteContainer}>

                                    <div className={classes.favouriteContainer__imageContainer}>
                                        <a href={"/divesite/" + favourite.site._id}>
                                            <img src={'http://localhost:8080/' + favourite.siteImage} 
                                            className={classes.image}
                                            />
                                        </a>
                                    </div>
                                    <div className={classes.favouriteContainer__pointContainer}>
                                        <span className={classes.point}>Shore Dive · Great for Scuba</span>
                                    </div>
                                    <div className={classes.favouriteContainer__nameContainer}>
                                        <a href={"/divesite/" + favourite.site._id}>
                                            <span className={classes.name}>{favourite.siteName}, {favourite.siteArea}</span>
                                        </a>
                                    </div>
                                    
                                    <div className={classes.favouriteContainer__descriptionContainer}>
                                        <span className={classes.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
                                    </div>
                                    <div className={classes.favouriteContainer__ratingContainer}>
                                        <div className={classes.rating}>
                                            {/* <StarRating siteRatings = {favourite.site.ratings}/> */}
                                        </div>
                                    </div>
                                    <div className={classes.favouriteContainer__moreContainer}>
                                        <a href={"/divesite/" + favourite.site._id} className={classes.more}>More...</a>
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

export default ViewProfileView;
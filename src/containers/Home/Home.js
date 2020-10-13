import React, { useState, useContext, useEffect } from 'react';

import {useHistory} from 'react-router-dom';
import { useMediaQuery } from '../../CustomHooks/useMediaQuery';

import { SearchCoordsContext } from '../../context/AuthContext';
import { AuthDrawerContext, NavbarContext } from '../../context/AuthContext';

import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';

import classes from './Home.module.scss';

import {ReactComponent as GlobeSVG} from '../../assets/icons/globe.svg';
import {ReactComponent as SnorkelSVG} from '../../assets/icons/snorkel.svg';
import {ReactComponent as BinocularsSVG} from '../../assets/icons/binoculars.svg';

import homeImg1 from '../../assets/images/homeImg1.jpg';
import homeImg2 from '../../assets/images/homeImg2.jpg';
import homeImg3 from '../../assets/images/homeImg3.jpg';
import homeImg4 from '../../assets/images/homeImg4.jpg';



const Home = () => {

    const [address, setAddress] = useState("");

    const [searchCoordinates, setSearchCoordinates] = useContext(SearchCoordsContext);
    const [authDrawer, setAuthDrawer] = useContext(AuthDrawerContext);
    const [navbar, setNavbar] = useContext(NavbarContext);

    useEffect(() => {
        setNavbar("home");

        return function cleanup() {
            setNavbar("main");
        };
    },[]);

    let history = useHistory();

    const handleSelect = async (value) => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setAddress(value);
        setSearchCoordinates(latLng);
        history.push("/map");

    }

    const isRowBased = useMediaQuery('(max-width: 800px)');

    //console.log(isRowBased);

    let style;

    return (
        <div>
        <div className={`${classes.home} ${authDrawer.open ? classes.shrink : null}`}>
            <div className={`${classes.content}`}>
            <div className={classes.homeMainPage}>
                <div className={authDrawer.open ? classes.groupedContent__disappear : classes.groupedContent__display}>
                    <h1 className={classes.homeMainPage__title}>Find your Atlantis</h1> 
                        {/* <p className={classes.homeDescription}> A description of what this website is trying to achieve</p> */}
                        <div className={classes.searchContainer}>
                        <PlacesAutocomplete value={address}
                                            onChange={setAddress}
                                            onSelect={handleSelect}
                                        
                        >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div className={classes.searchBar}>
                            {/* <p>Latitude: {searchCoordinates.lat}</p>
                            <p>Longitude: {searchCoordinates.lng}</p> */}
                            <div className={classes.searchBar__searchInputContainer}>
                            <h3 className={classes.locationText}>Location</h3>
                            <input {...getInputProps({placeholder: "Where do you want to dive?"})} className={classes.searchInput}/>
                            <div className={classes.dropdownContainer}>
                                {loading ? <div> ...loading </div> : null}
                                {suggestions.map(suggestion => {

                                    if (isRowBased) {
                                        style = {
                                            backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                                            color: "black",
                                            width: "275px",
                                            margin: "0 auto",
                                            padding: "1vw",
                                            fontSize: "10px"
                                        }
                                    } else {
                                        style = {
                                            backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                                            color: "black",
                                            width: "500px",
                                            margin: "0 auto",
                                            padding: "1vw"
                                        }
                                    }

                                    return <div {...getSuggestionItemProps(suggestion, {style})}>
                                                {suggestion.description}
                                            </div>
                                })}

                            </div>
                            </div>
                            <div className={classes.searchBar__searchBtnContainer}>

                                <div className={classes.searchBtn} onClick={() => handleSelect()}>
                                
                                    <span>Search</span>
                                </div>
                            </div>
                        </div>
                        )}
                        </PlacesAutocomplete>
                        </div>

                        <div className={classes.pointsContainer}>
                {/* //TODO|||||||||| DIVE SITES ACROSS THE GLOBE ||||||||||||||||||||||| */}
                <div className={classes.point}>
                    <div className={classes.point__icon}>
                        <GlobeSVG className={classes.icon}/>
                    </div>
                    <div className={classes.point__title}>
                    <h4>Dive sites across the globe</h4>
                    </div>
                    <div className={classes.point__description}>
                    <p>Find dive sites anywhere in the world. With new dive sites added and updated through the community.</p>
                    </div>
                </div>

                 {/* //TODO|||||||||| SNORKEL, FREEDIVE OR SCUBA ||||||||||||||||||||||| */}
                 <div className={classes.point}>
                    <div className={classes.point__icon}>
                        <SnorkelSVG className={classes.icon}/>
                    </div>
                    <div className={classes.point__title}>
                    <h4>Snorkel, Free dive or Scuba</h4>
                    </div>
                    <div className={classes.point__description}>
                    <p>No matter what skill you are, there is a dive site for you. Either for a casual snorkel or a deep wreck dive, there is a location for everyone!</p>
                    </div>
                </div>

                 {/* //TODO|||||||||| DIVE REPORTS ||||||||||||||||||||||| */}
                 <div className={classes.point}>
                    <div className={classes.point__icon}>
                        <BinocularsSVG className={classes.icon}/>
                    </div>
                    <div className={classes.point__title}>
                    <h4>Dive Reports</h4>
                    </div>
                    <div className={classes.point__description}>
                    <p>Keep logs of your dives for yourself and others to see. Explore certain dive sites reports to get real experiences of peoples dives.</p>
                    </div>
                </div>


            </div>
                </div>
            </div>
        
            <div className={classes.homeContent}>
            <div className={classes.homeContent__1}>
                <div className={classes.contentLeft}>
                    <div className={classes.contentLeft__titleContainer}>
                        <h3>Snorkel, scuba or free dive, theres locations all around the world waiting to be explored.</h3>
                    </div>
                    <div className={classes.contentLeft__textContainer}>
                        <p>Locus is a dive site location service for many locations across the globe. We provide information on theses sites to help find the most suitable site for you. With sites being added frequently, you will always find a new place to explore.</p>
                    </div>
                </div>
                <div className={classes.contentRight}>
                <img className={`${classes.image} ${classes.image__1}`} src={homeImg1} alt="man in diving gear"/>
                <img className={`${classes.image} ${classes.image__2}`} src={homeImg2} alt="women snorkelling"/>
                </div>
            </div>
            <div className={classes.homeContent__2}>
                <img className={`${classes.image} ${classes.image__3}`} src={homeImg3} alt="birds eye view of beach"/>
                <div className={classes.mapContainer}>
                    <p className={classes.mapContainer__text}>Press the button below to go to the map or scroll up and type in a location that you want to dive. Explore around the area to discover the dive sites.</p>
                    <button className={`${classes.btn} ${classes.btn__map}`}>Go To Map</button>
                </div>
                <img className={`${classes.image} ${classes.image__4}`} src={homeImg4} alt="turtle gliding through the water"/>
                <div className={classes.signUpContainer}>
                    <p className={classes.signUpContainer__text}>Come join our community of  marine enthusiasts and adventurers that help provide information to others. You can request to add a dive site and be able to add dive reports for others to see and hear your experience.</p>
                    <button className={`${classes.btn} ${classes.btn__signUp}`}>Sign up</button>
                </div>
            </div>
        </div>
            </div>
            </div>
        </div>
    );
};

export default Home;
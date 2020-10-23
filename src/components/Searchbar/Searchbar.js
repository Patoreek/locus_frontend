import React, { useState, useContext, useEffect } from 'react';

import classes from './Searchbar.module.scss';

import {useHistory} from 'react-router-dom';
import { useMediaQuery } from '../../CustomHooks/useMediaQuery';
import { SearchCoordsContext, LocationNameContext } from '../../context/AuthContext';





import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';

const Searchbar = () => {

    const [address, setAddress] = useState("");

    const [searchCoordinates, setSearchCoordinates] = useContext(SearchCoordsContext);
    const [locationName, setLocationName] = useContext(LocationNameContext);


    const [navbar, setNavbar] = useState('map');

    let history = useHistory();
    let style;


    useEffect(()=> {
        const url = window.location.pathname;
        if (url.includes("map") || url.includes("mySites")){
            console.log('[SearchbarMap] Page is on a MAP!');
            setNavbar('map');
        } else {
            console.log('[SearchbarMap] Page is NOT on a MAP!');
            setNavbar('main');
        }
    },[]);

    const handleSelect = async (value) => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setLocationName(value);
        setAddress(value);
        setSearchCoordinates(latLng);
        history.push("/map");

    }
    const isRowBased = useMediaQuery('(max-width: 800px)');
    return (
        <PlacesAutocomplete value={address}
                                           onChange={setAddress}
                                           
                                            onSelect={handleSelect}
                                        
                        >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div className={`${classes.searchBar} ${navbar == "map" ? classes.searchBar__mainbar : null} `} >
                            {/* <p>Latitude: {searchCoordinates.lat}</p>
                            <p>Longitude: {searchCoordinates.lng}</p> */}
                            <div className={`${classes.searchBar__searchInputContainer} ${navbar == "map" ? classes.searchBar__searchInputContainerMain : null}`}>
                            <h3 className={classes.locationText}>Location</h3>
                            <input {...getInputProps({placeholder: "Where do you want to dive?"})} className={`${classes.searchInput} ${navbar == "map" ? classes.searchInput__main : null}`}/>
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
                        
    );
};

export default Searchbar;
import React, { useState, useContext } from 'react';

import {useHistory} from 'react-router-dom';

import { useMediaQuery } from '../../CustomHooks/useMediaQuery';


import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';

import { SearchCoordsContext } from '../../context/AuthContext';

import classes from './Home.module.css';

const Home = () => {

    const [address, setAddress] = useState("");

    const [searchCoordinates, setSearchCoordinates] = useContext(SearchCoordsContext);

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
        <div className={classes.homeContainer}>
            <h1 className={classes.homeTitle}>Looking for your next underwater adventure?</h1> 
            <h3 className={classes.homeSlogan}> Discover dive sites all around the world.</h3>
            {/* <p className={classes.homeDescription}> A description of what this website is trying to achieve</p> */}
            <PlacesAutocomplete value={address}
                                onChange={setAddress}
                                onSelect={handleSelect}
            >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
                {/* <p>Latitude: {searchCoordinates.lat}</p>
                <p>Longitude: {searchCoordinates.lng}</p> */}

                <input {...getInputProps({placeholder: "Enter a Location"})} className={classes.searchBar}/>
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
            )}
            </PlacesAutocomplete>

            <div className={classes.latestNewsContainer}>
                <h2 className={classes.latestNewsHeader}>Latest News 04/05/2020</h2>
                <p className={classes.latestNewsParagraph}>
                        The Latest news will appear here regarding updates and improvements 
                        for Locus. Currently at version 1.0 and has currently basic functionalities.
                        This includes able to make an account and add, edit and contribute to distributing
                        dive site information and locations. Basic profiles are available and basic image upload
                        is available. More improvements are planned such as forum and event features for individual
                        dive sites.
                </p>
            </div>

             
            
        </div>
    );
};

export default Home;
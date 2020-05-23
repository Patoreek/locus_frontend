import React, { useState, useContext } from 'react';

import {useHistory} from 'react-router-dom';


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

    return (
        <div className={classes.homeContainer}>
            <h1 className={classes.homeTitle}>Looking for your next underwater adventure?</h1> 
            <h3 className={classes.homeSlogan}> Discover dive sites all around the world.</h3>
            <p className={classes.homeDescription}> A description of what this website is trying to achieve</p>
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

                        const style = {
                            backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                            color: "black",
                            width: "40vw",
                            margin: "0 auto"
                        }

                        return <div {...getSuggestionItemProps(suggestion, {style})}>
                                    {suggestion.description}
                                </div>
                    })}

                </div>
            </div>
            )}
            </PlacesAutocomplete>

             
            
        </div>
    );
};

export default Home;
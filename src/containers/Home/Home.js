import React, { useState, useContext } from 'react';

import {useHistory} from 'react-router-dom';


import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';

import { SearchCoordsContext } from '../../context/AuthContext';

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
        <div>
            <h1>Looking for your next underwater adventure?</h1> 
            <p> Discover dive sites all around the world.</p>
            <PlacesAutocomplete value={address}
                                onChange={setAddress}
                                onSelect={handleSelect}
            >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
                <p>Latitude: {searchCoordinates.lat}</p>
                <p>Longitude: {searchCoordinates.lng}</p>

                <input {...getInputProps({placeholder: "Enter a Location"})}/>
                <div>
                    {loading ? <div> ...loading </div> : null}

                    {suggestions.map(suggestion => {

                        const style = {
                            backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
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
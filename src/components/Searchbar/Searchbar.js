import React, { useState, useContext, useEffect } from 'react';

import classes from './Searchbar.module.scss';

import {useHistory} from 'react-router-dom';
import { useMediaQuery } from '../../CustomHooks/useMediaQuery';
import { SearchCoordsContext, LocationNameContext, SearchValueContext } from '../../context/AuthContext';

import {ReactComponent as SearchSVG} from '../../assets/icons/magnifying-glass.svg';




import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';

const Searchbar = () => {

    const [address, setAddress] = useState("");

    const [searchCoordinates, setSearchCoordinates] = useContext(SearchCoordsContext);
    const [locationName, setLocationName] = useContext(LocationNameContext);
    const [searchValue, setSearchValue] = useContext(SearchValueContext);


    const [navbar, setNavbar] = useState('map');

    let history = useHistory();
    let style;


    useEffect(()=> {
        const url = window.location.pathname;
        if (url.includes("map") || url.includes("mySites")){
          //  console.log('[SearchbarMap] Page is on a MAP!');
            setNavbar('map');
        } else {
         //   console.log('[SearchbarMap] Page is NOT on a MAP!');
            setNavbar('main');
        }
    },[]);

    const handleSelect = async (value) => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setLocationName(value);
        setAddress(value);
        setSearchCoordinates(latLng);
        setSearchValue(value);
        history.push("/map");

    }
    return (
        <PlacesAutocomplete value={address}
                                           onChange={setAddress}
                                           
                                            onSelect={handleSelect}
                                        
                        >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div className={`${classes.searchBar} ${navbar == "main" ? classes.searchBar__mainbar : null} `} >
                
                            <div className={`${classes.searchBar__searchInputContainer} ${navbar == "main" ? classes.searchBar__searchInputContainerMain : null}`}>
                            <h3 className={classes.locationText}>Location</h3>
                            <input {...getInputProps({placeholder: "Where do you want to dive?"})} className={`${classes.searchInput} ${navbar == "main" ? classes.searchInput__main : null}`} value={searchValue} onClick={() => setSearchValue(null)}/>
                            <div className={classes.dropdownContainer}>
                                {loading ? <div> ...loading </div> : null}
                                {suggestions.map(suggestion => {

                                  
                                        // style = {
                                        //     backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                                        //     color: "black",
                                        //     background:
                                        //     width: "40rem",
                                        //     margin: "0 auto",
                                        //     padding: "1rem",
                                        //     fontSize: "1.4rem"
                                        // }
                                  

                                    // return <div {...getSuggestionItemProps(suggestion, {style})}>
                                    return <div {...getSuggestionItemProps(suggestion)} className={classes.suggestions}>
                                                {suggestion.description}
                                            </div>
                                })}

                            </div>
                            </div>
                            <div className={classes.searchBar__searchBtnContainer}>

                                <div className={classes.searchBtn} onClick={() => handleSelect()}>
                                
                                    <SearchSVG className={classes.searchSVG}/>
                                </div>
                            </div>
                        </div>
                        )}
                        </PlacesAutocomplete>
                        
    );
};

export default Searchbar;
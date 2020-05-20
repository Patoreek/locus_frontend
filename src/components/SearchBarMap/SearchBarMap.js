import React, {useState, useCallback} from 'react';

import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
    ComboboxOptionText,
  } from "@reach/combobox";
  import "@reach/combobox/styles.css";

  import classes from './SearchBarMap.module.css'


const SearchBarMap = (props) => {
    //console.log('In searchBarMap');
    //console.log(props.panTo);

    const {ready, 
           value, 
           suggestions: {status, data}, 
           setValue, 
           clearSuggestions
        } = usePlacesAutocomplete({
                requestOptions: { 
                    location: {lat: () => -33.928820 ,lng: () => 151.209290},
                    radius: 200 * 10000,
                }
            }
    );

    const panTo = props.panTo;
    

    return (
        <div className={classes.comboboxDiv}>
            <Combobox
                onSelect={async (address) => {
                    setValue(address, false);
                    clearSuggestions();
                    try {
                        const results = await getGeocode({address});
                        const {lat, lng} = await getLatLng(results[0]);
                        //console.log(lat,lng);
                        panTo({lat, lng});

                    } catch(error){
                        console.log(error);
                    }

                    //console.log(address);
                }}
                
            >
                <ComboboxInput 
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value)
                    }}
                    disabled={!ready}
                    placeholder="Enter location"
                    className={classes.comboboxInput}
                />
                <ComboboxPopover>
                <ComboboxList/>
                    {status === "OK" && data.map(({id, description}) => (
                        <ComboboxOption key={id} value={description} />
                    ))}
                <ComboboxList/>
                </ComboboxPopover>
            </Combobox>
        </div>
    );
};

export default SearchBarMap;
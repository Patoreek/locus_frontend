import React, {useContext} from 'react';

import { PanToContext, LocationNameContext } from '../../context/AuthContext';
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

  import classes from './SearchBarMap.module.scss';

  import Locate from '../Locate/Locate';



const SearchBarMap = (props) => {



    const panTo = useContext(PanToContext);

    const [locationName, setLocationName] = useContext(LocationNameContext); 

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
    

    return (
        <div className={classes.combobox}>
            <Combobox
                onSelect={async (address) => {
                    setValue(address, false);
                    console.log('[searchbarmap]');
                    setLocationName(address);

                    clearSuggestions();
                    try {
                        const results = await getGeocode({address});
                        const {lat, lng} = await getLatLng(results[0]);
                       // console.log(results);
                        //console.log(lat,lng);
                        panTo({lat, lng});
                        

                    } catch(error){
                        console.log(error);
                    }

                    //console.log(address);
                }}
                
            >
                <span className={classes.combobox__title}>Location</span>
                <ComboboxInput 
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value)
                    }}
                    disabled={!ready}
                    placeholder="Where do you want to dive?"
                    className={classes.combobox__input}
                  
                />
                <ComboboxPopover>
                <ComboboxList/>
                    {status === "OK" && data.map(({id, description}) => (
                        <ComboboxOption key={id} value={description} />
                    ))}
                <ComboboxList/>
                </ComboboxPopover>
                <button className={classes.combobox__btn}> Search </button>
            </Combobox>

        </div>
    );
};

export default SearchBarMap;
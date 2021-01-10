import React, { useContext } from "react";

import {
  PanToContext,
  LocationNameContext,
  SearchValueContext,
} from "../../context/AuthContext";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

import classes from "./SearchBarMap.module.scss";

import Locate from "../Locate/Locate";

import { ReactComponent as SearchSVG } from "../../assets/icons/magnifying-glass.svg";

const SearchBarMap = (props) => {
  const panTo = useContext(PanToContext);

  const [locationName, setLocationName] = useContext(LocationNameContext);
  const [searchValue, setSearchValue] = useContext(SearchValueContext);

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => -33.92882, lng: () => 151.20929 },
      radius: 200 * 10000,
    },
  });

  const handleBtn = async (value) => {
    try {
      const results = await getGeocode({ value });
      const { lat, lng } = await getLatLng(results[0]);
      // console.log(results);
      //console.log(lat,lng);
      panTo({ lat, lng });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.combobox}>
      <Combobox
        onSelect={async (address) => {
          setValue(address, false);
          // console.log('[searchbarmap]');
          setLocationName(address);
          setSearchValue(address);
          clearSuggestions();
          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            // console.log(results);
            //console.log(lat,lng);
            panTo({ lat, lng });
          } catch (error) {
            console.log(error);
          }

          //console.log(address);
        }}
      >
        <span className={classes.combobox__title}>Location</span>
        <ComboboxInput
          value={searchValue}
          onChange={(e) => {
            setValue(e.target.value);
            setSearchValue(e.target.value);
          }}
          disabled={!ready}
          placeholder="Where do you want to dive?"
          className={classes.combobox__input}
        />
        <ComboboxPopover>
          <ComboboxList className={classes.combobox__dropdown} />
          {status === "OK" &&
            data.map(({ id, description }) => (
              <ComboboxOption
                key={id}
                value={description}
                className={classes.suggestion}
              />
            ))}
          <ComboboxList />
        </ComboboxPopover>
        <button
          className={classes.combobox__btn}
          onClick={() => handleBtn(searchValue)}
        >
          <SearchSVG className={classes.searchSVG} />
        </button>
      </Combobox>
    </div>
  );
};

export default SearchBarMap;

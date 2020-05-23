import React, { useState, createContext, useContext } from 'react';

export const AuthContext = createContext();

export const AccountContext = createContext();

export const LoadingContext = createContext();

export const UserOnMapContext = createContext();

export const FavButtonContext = createContext();

export const RemoveFavContext = createContext();

export const FavouritesContext = createContext();

export const GetFavouritesContext = createContext();

export const PanelSizeContext = createContext();

export const MapSizeContext = createContext();

export const SearchBarContext = createContext();

export const SearchCoordsContext = createContext();

export const LocateButtonContext = createContext();



export const AuthProvider = (props) => {


    const [isAuth, setIsAuth] = useState(false);


    const [account, setAccount] = useState({
        id: null,
        username: null,
        email: null
    });

    const [ isLoading, setIsLoading ] = useState(true);

    const [ isUserOnMap, setIsUserOnMap ] = useState(false); // Add

    const [favButton, setFavButton] = useState(true);

    const [favourites, setFavourites] = useState(null);

    const [panelSize, setPanelSize] = useState("30vw");

    const [mapSize, setMapSize] = useState("70vw"); // 70vw

    const [searchBarStyle, setSearchBarStyle] = useState({
      width: "30vw",
      left: "50vw",
      display: null
    });

    const [locateButtonStyle, setLocateButtonStyle] = useState({
        left: "80vw",
        display: null
    });

    const [searchCoordinates, setSearchCoordinates] = useState({
      lat: null,
      lng: null
    });

    

    async function getFavourites(setIsLoading) {

        try {
          const response = await fetch('http://localhost:8080/user/getFavourites',{
            method: 'GET',
            credentials: 'include',
          });
          const favourites = await response.json();
          console.log(favourites);
          setFavourites(favourites.favSites);
          if (setIsLoading != null){
              setIsLoading(false);
          }
  
        } catch (error) {
         console.log(error);
         setIsLoading(null);
        }
      }

   


    return (
        <AuthContext.Provider value = {[isAuth, setIsAuth]}>
        <AccountContext.Provider value = {[account, setAccount]}>
        <LoadingContext.Provider value = {[isLoading, setIsLoading]}>
        <UserOnMapContext.Provider value = {[isUserOnMap, setIsUserOnMap]}>
        <FavButtonContext.Provider value = {[favButton, setFavButton]}>
        <FavouritesContext.Provider value = {[favourites, setFavourites]}>
        <MapSizeContext.Provider value = {[mapSize, setMapSize]}>
        <PanelSizeContext.Provider value = {[panelSize, setPanelSize]}>
        <GetFavouritesContext.Provider value = {getFavourites}>
        <SearchCoordsContext.Provider value = {[searchCoordinates, setSearchCoordinates]}>
        <SearchBarContext.Provider value = {[searchBarStyle, setSearchBarStyle]}>
        <LocateButtonContext.Provider value = {[locateButtonStyle, setLocateButtonStyle]}>
       
        {props.children}

        </LocateButtonContext.Provider>
        </SearchBarContext.Provider>
        </SearchCoordsContext.Provider>
        </GetFavouritesContext.Provider>
        </PanelSizeContext.Provider>
        </MapSizeContext.Provider>
        </FavouritesContext.Provider>
        </FavButtonContext.Provider>       
        </UserOnMapContext.Provider>
        </LoadingContext.Provider>
        </AccountContext.Provider>
        </AuthContext.Provider>

    );
}


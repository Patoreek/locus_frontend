import React, { useState, createContext, useContext } from 'react';

export const AuthContext = createContext();

export const AccountContext = createContext();

export const LoadingContext = createContext();

export const UserOnMapContext = createContext();

export const FavButtonContext = createContext();

export const RemoveFavContext = createContext();

export const FavouritesContext = createContext();

export const GetFavouritesContext = createContext();


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

    async function getFavourites(setIsLoading) {

        try {
          const response = await fetch('http://localhost:8080/user/getFavourites',{
            method: 'GET',
            credentials: 'include',
          });
          const favourites = await response.json();
          console.log(favourites);
          setFavourites(favourites.favSites);
          if (setIsLoading !== null){
              setIsLoading(false);
          }
  
        } catch (error) {
         console.log(error);
         setIsLoading(null);
        }
      }

    async function removeFromFavourite(selectedSite, setIsLoading) {
        console.log('removing from favourite');
        // SELECTEDSITE ID PUT INTO FAVOURITE SITES ID FOR THAT USER
        console.log(selectedSite._id);
        const response = await fetch('http://localhost:8080/user/removeFromFavourite',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                selectedSiteId: selectedSite._id,
                userId: account.id
            })
        });
        const data = await response.json();

        if (data.removedFav){
            console.log('UpdatedFav');
            console.log(data.updatedFav);
            setFavourites(data.updatedFav);
            setFavButton(true);
            if (setIsLoading !== null){
                getFavourites(setIsLoading);
            } else {
                getFavourites();
            }
        } else {
            setFavButton(false);
        }
        // console.log(data.message);
        // console.log('UPDATED FAVOURITES')
        // console.log(favourites);

 
          
    }


    return (
        <AuthContext.Provider value = {[isAuth, setIsAuth]}>
        <AccountContext.Provider value = {[account, setAccount]}>
        <LoadingContext.Provider value = {[isLoading, setIsLoading]}>
        <UserOnMapContext.Provider value = {[isUserOnMap, setIsUserOnMap]}>
        <FavButtonContext.Provider value = {[favButton, setFavButton]}>
        <RemoveFavContext.Provider value = {removeFromFavourite}>
        <FavouritesContext.Provider value = {[favourites, setFavourites]}>
        <GetFavouritesContext.Provider value = {getFavourites}>

                {props.children}

        </GetFavouritesContext.Provider>
        </FavouritesContext.Provider>
        </RemoveFavContext.Provider>
        </FavButtonContext.Provider>       
        </UserOnMapContext.Provider>
        </LoadingContext.Provider>
        </AccountContext.Provider>
        </AuthContext.Provider>

    );
}


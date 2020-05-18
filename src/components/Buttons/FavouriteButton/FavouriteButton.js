import React, {useContext, useEffect, useState} from 'react';

import {Button} from 'react-bootstrap';

import { FavouritesContext,
         GetFavouritesContext,
         AccountContext 
        } from '../../../context/AuthContext';

import { SiteContext } from '../../../context/DiveSiteContext';


const FavouriteButton = (props) => {

   // const removeFromFavourite = useContext(RemoveFavContext);

    //const [favButton, setFavButton] = useContext(FavButtonContext);

    const [favButton, setFavButton] = useState(true);

    const [selectedSite, setSelectedSite] = useContext(SiteContext);

    const [account, setAccount] = useContext(AccountContext);

    const [favourites, setFavourites] = useContext(FavouritesContext);

    const [ site, setSite ] = useState(null);

    const getFavourites = useContext(GetFavouritesContext);


    useEffect(() => {
        setSite(props.site);
        checkUserRelation();
    },[]);

    async function removeFromFavourite(selectedSite, setIsLoading) {
        // if (!selectedSite){
        //         setSelectedSite(props.site);
        // }
        // console.log('removing from favourite');
        // // SELECTEDSITE ID PUT INTO FAVOURITE SITES ID FOR THAT USER
        // console.log(selectedSite._id);
        const response = await fetch('http://localhost:8080/user/removeFromFavourite',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                selectedSiteId: props.site._id,
                userId: account.id
            })
        });
        const data = await response.json();
        console.log(data);
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
    }
    

    async function checkUserRelation(){

        console.log(props.site._id);
        //     //console.log(site);
        //     //console.log(selectedSite);
            const response = await fetch('http://localhost:8080/user/checkFavourites',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    selectedSiteId: props.site._id
                })
            });
            const data = await response.json();
            console.log('RESPONSE FROM API');
            console.log(data.message);
            const isFav = data.isFav;
            console.log(data.isFav);
            
            if (isFav){
                setFavButton(false);
            } else {
                setFavButton(true);
            }
            
    }


    async function addToFavourite() {
    
            const response = await fetch('http://localhost:8080/user/addToFavourite',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    selectedSiteId: props.site._id,
                    userId: account.id
                })
            });
            const data = await response.json();

            console.log(data.message);
            setFavButton(false);
            //const sites = data;
          
    }

    let favouriteButton;
    if (favButton) {

        favouriteButton = (
            <Button onClick={addToFavourite}>Favourite</Button>
        );
    } else {

        favouriteButton = (
            <Button onClick={() => removeFromFavourite(selectedSite)}>UnFavourite</Button>
        );
    }

    return (
        <div>
            {favouriteButton}
        </div>
    );
};

export default FavouriteButton;
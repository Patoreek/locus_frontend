import React, { useState, useContext, useEffect } from 'react';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';

import { AuthContext } from '../../context/AuthContext';

import { SiteContext } from '../../context/DiveSiteContext';

import customClasses from './StarRating.module.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
    margin: '0 auto',
    paddingTop: '1vh'
  },
}));







const ReviewStars = (props) => {
    const classes = useStyles();

    const [isAuth, setIsAuth] = useContext(AuthContext);
    const [selectedSite, setSelectedSite] = useContext(SiteContext);

    const [rating, setRating] = useState(1.5);
    const [totalRatings, setTotalRatings] = useState(0);

    const [value, setValue] = useState(2.5);

    useEffect(()=> {
        async function checkRating() {
            try {
                const response = await fetch('http://localhost:8080/diveSites/getRating',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        selectedSiteId: selectedSite._id
                    })
                });
                const data = await response.json();
        
                //console.log(data.fixedAverageRating);
                setRating(data.fixedAverageRating);
                setTotalRatings(data.totalRatings);

                //setFavButton(false);
                //const sites = data;
            } catch(err) {
                console.log(err);
            }
        }
        if(!props.siteRatings){
          checkRating();
        } else {
          let numOfRatings = 0;
          let totalRatingNum = 0;

          for (let i = 0; i < props.siteRatings.length; i++) {
            //console.log('RAING NUMBER => ' + i);
             //console.log(props.siteRatings[i]);
             numOfRatings++;
             totalRatingNum = totalRatingNum + props.siteRatings[i].rating;
          }

          const avgRating = totalRatingNum / numOfRatings;
        
          const fixedAvgRating = (Math.round(avgRating * 2) / 2).toFixed(1);

          setRating(fixedAvgRating);
          setTotalRatings(numOfRatings);

        }
    
    },[])



    async function submitRatingHandler(newValue) {
        console.log('Value: ' + newValue);
        console.log(selectedSite._id);
        console.log('Submitting Rating');

        const response = await fetch('http://localhost:8080/diveSites/addRating',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                selectedSiteId: selectedSite._id,
                ratingValue: newValue
            })
        });
        const data = await response.json();
        console.log(data.message);
              
    }

    

  return (
    <div className={classes.root}>
    {isAuth && (
        <div>
        <Rating name="half-rating"
              precision={0.5}
              value={rating}
              onChange={(event, newValue) => {
                setValue(newValue);
                submitRatingHandler(newValue);
              }}
              style={props.guestMapStyle}
        />
        <p className={customClasses.totalRatings} style={props.totalRatingStyle}><b>({totalRatings})</b></p>
        </div>
    )}
    {!isAuth && (
        <Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly />
    )}
    </div>
  );
};

export default ReviewStars;
import { convertNeSwToNwSe } from 'google-map-react';
import React, {useState, useEffect} from 'react';

import classes from './WeatherContainer.module.scss';

const WeatherContainer = (props) => {

    const site = props.site;

    const lat = props.site.latitude;
    const lng = props.site.longitude;

    const [daily, setDaily] = useState([]);


    useEffect(() => {
    
        async function getWeather() {

            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=cae87fcf9eb012eba96c36c752131310&units=metric`,{
                    method: 'GET',
                    //credentials: 'include',
                });
                const results = await response.json();
                console.log(results);
                // const site = results.site;

                let dailyArray = [];

                results.daily.map(day => {
                    const temp = day.temp.max;
                    const tempMorning = day.temp.morn;
                    const weather = day.weather[0].main;
                    const dayName = new Date(day.dt * 1000).toLocaleString("en-us", {
                        weekday: "short"
                    });
                    
                    
                    console.log(temp);
                    console.log(tempMorning);
                    console.log(weather);
                    console.log(dayName);

                    dailyArray = [...dailyArray, {
                        day: dayName,
                        temp: temp.toFixed(1),
                        tempMorning: tempMorning.toFixed(1),
                        weather: weather,
                    }];
                });

                setDaily(dailyArray);
                
            } catch (error) {
             console.log(error);
             //setIsLoading(true);
            }
          }

        getWeather();

    }, []);

    return (
        <div className={classes.daysContainer}>
            {daily.map(day => (
            <div className={classes.day}>
                <h3>{day.day}</h3>
                <p><b>Temp: </b>{day.temp}</p>
                <p><b>Temp Morning: </b>{day.tempMorning}</p>
                <p><b>Weather: </b>{day.weather}</p>
            </div>
            ))}
    
        </div>
    );
};

export default WeatherContainer;
import React, {useState, useEffect} from 'react';

import { format } from 'date-fns';


import classes from './WeatherContainer.module.scss';

import  {ReactComponent as SunnySVG} from '../../assets/icons/weather_icons/sunny.svg';
import  {ReactComponent as NightSVG} from '../../assets/icons/weather_icons/moon.svg';
import  {ReactComponent as OvercastSVG} from '../../assets/icons/weather_icons/overcast.svg';
import  {ReactComponent as CloudySVG} from '../../assets/icons/weather_icons/cloudy.svg';
import  {ReactComponent as LightRainSVG} from '../../assets/icons/weather_icons/light_rain.svg';
import  {ReactComponent as HeavyRainSVG} from '../../assets/icons/weather_icons/heavy_rain.svg';
import  {ReactComponent as ThunderSVG} from '../../assets/icons/weather_icons/thunder.svg';


import  {ReactComponent as LightRainBGSVG} from '../../assets/images/weather_images/light_rain_bg.svg';
import  {ReactComponent as SunnyBGSVG} from '../../assets/images/weather_images/sunny_bg.svg';
import  {ReactComponent as NightBGSVG} from '../../assets/images/weather_images/night_bg.svg';
import  {ReactComponent as OvercastBGSVG} from '../../assets/images/weather_images/overcast_bg.svg';
import  {ReactComponent as CloudyBGSVG} from '../../assets/images/weather_images/cloudy_bg.svg';
import  {ReactComponent as ThunderBGSVG} from '../../assets/images/weather_images/thunder_bg.svg';
import  {ReactComponent as HeavyRainBGSVG} from '../../assets/images/weather_images/heavy_rain_bg.svg';









const WeatherContainer = (props) => {

    const site = props.site;

    const lat = props.site.latitude;
    const lng = props.site.longitude;

    const [daily, setDaily] = useState([]);

    const [selectedDay, setSelectedDay] = useState([]);

    const [time, setTime] = useState('day');


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
                    const weather = day.weather[0].id;
                    const dayName = new Date(day.dt * 1000).toLocaleString("en-us", {
                        weekday: "short"
                    });
                    const fullDayName = new Date(day.dt * 1000).toLocaleString("en-us", {
                        weekday: "long"
                    });

                    const date = format(day.dt * 1000, 'dd, MMM, yyyy');

                    // console.log(temp);
                    // console.log(tempMorning);
                    // console.log(weather);
                    // console.log(dayName);
                    // console.log(fullDayName);
                    console.log(date);

                    dailyArray = [...dailyArray, {
                        day: dayName,
                        temp: temp.toFixed(1),
                        tempMorning: tempMorning.toFixed(1),
                        weather: weather,
                        fullDay: fullDayName,
                        date: date,
                    }];
                });

                setDaily(dailyArray);
                //console.log(dailyArray[0]);
                setSelectedDay(dailyArray[0]);

                const currentDT = new Date(results.daily[0].dt);
                const sunset = new Date(results.daily[0].sunset);
                const sunrise = new Date(results.daily[0].sunrise);

                //! FIND A SOLUTION
                // if ((currentDT.getTime() > sunrise.getTime()) && (currentDT.getTime() < sunset.getTime())) {
                //     setTime('day');
                //     console.log('Its daytime');
                // } else {
                //     setTime('night');
                //     console.log('Its nighttime');
                // }

                console.log('Current Time = ' + currentDT);
                console.log('Sunrise = ' + sunrise);
                console.log('Sunset = ' + sunset);

                
            } catch (error) {
             console.log(error);
             //setIsLoading(true);
            }
          }

        getWeather();

    }, []);

    return (
        <div className={classes.weatherContainer}>

            <div className={classes.selectedDay}>
                <div className={classes.selectedDay__background}>
                            {/* //* LIGHT RAIN */}
                            {
                                selectedDay.weather === 500 ||
                                selectedDay.weather === 501 ||
                                selectedDay.weather === 520 ||
                                selectedDay.weather === 521 ||
                                selectedDay.weather === 300 ||
                                selectedDay.weather === 301 ||
                                selectedDay.weather === 310 ||
                                selectedDay.weather === 311 ||
                                selectedDay.weather === 313 ||
                                selectedDay.weather === 321
                                ? <LightRainBGSVG className={classes.background}/> : null
                            }

                            {/* //* HEAVY RAIN */}
                            {
                                selectedDay.weather === 502 ||
                                selectedDay.weather === 503 ||
                                selectedDay.weather === 504 ||
                                selectedDay.weather === 522 ||
                                selectedDay.weather === 531 ||
                                selectedDay.weather === 511 ||
                                selectedDay.weather === 302 ||
                                selectedDay.weather === 312 ||
                                selectedDay.weather === 314
                                ? <HeavyRainBGSVG className={classes.background}/> : null
                            }

                            {/* //* THUNDER RAIN */}
                            {
                                selectedDay.weather === 200 ||
                                selectedDay.weather === 201 ||
                                selectedDay.weather === 202 ||
                                selectedDay.weather === 210 ||
                                selectedDay.weather === 210 ||
                                selectedDay.weather === 211 ||
                                selectedDay.weather === 212 ||
                                selectedDay.weather === 221 ||
                                selectedDay.weather === 230 ||
                                selectedDay.weather === 231 ||
                                selectedDay.weather === 232
                                ? <ThunderBGSVG className={classes.background}/> : null
                            }

                            {/* //* CLOUDY */}
                            {
                                selectedDay.weather === 803 || selectedDay.weather === 804
                                ? <CloudyBGSVG className={classes.background}/> : null
                            }

                            {/* //* OVERCAST */}
                            {
                                selectedDay.weather === 801 || selectedDay.weather === 802
                                ? <OvercastBGSVG className={classes.background}/> : null
                            }


                            {/* //* SUNNY */}
                            {
                                selectedDay.weather === 800 && time == 'day'
                                ? <SunnyBGSVG className={classes.background}/> : null
                            }

                            {/* //* NIGHT */}
                            {
                                selectedDay.weather === 500 && time == 'night'
                                ? <NightBGSVG className={classes.background}/> : null
                            }
                        {/* <OvercastBGSVG className={classes.background} /> */}
                        {/* <HeavyRainBGSVG className={classes.background} /> */}
                        {/* <ThunderBGSVG className={classes.background} /> */}
                        {/* <CloudyBGSVG className={classes.background} /> */}
                        {/* <NightBGSVG className={classes.background} /> */}
                        {/* <SunnyBGSVG className={classes.background} /> */}
                        {/* <LightRainBGSVG className={classes.background} /> */}
                </div>
                <h2 className={classes.selectedDay__title}>Weather</h2>
                <p className={classes.selectedDay__day}>{selectedDay.fullDay}</p>
                <p className={classes.selectedDay__date}>{selectedDay.date}</p>
                <p className={classes.selectedDay__temp}>{selectedDay.temp}°<span className={classes.selectedDay__celius}>c</span></p>

            </div>

            <div className={classes.forecastContainer}>
                {daily.map(day => (
                <div className={classes.dayContainer} onClick={() => setSelectedDay(day)}>
                    <h3 className={classes.dayContainer__name}>{day.day}</h3>
                    <div className={`${classes.day} ${day == selectedDay ? classes.highlight : null}`}>
                    <p className={`${classes.day__temp} ${day == selectedDay ? classes.highlightTemp : null}`}>{day.temp}°</p>
                    {/* <p><b>Temp Morning: </b>{day.tempMorning}</p> */}
                        <div className={classes.day__weather}>


                            {/* //* LIGHT RAIN */}
                            {
                                day.weather === 500 ||
                                day.weather === 501 ||
                                day.weather === 520 ||
                                day.weather === 521 ||
                                day.weather === 300 ||
                                day.weather === 301 ||
                                day.weather === 310 ||
                                day.weather === 311 ||
                                day.weather === 313 ||
                                day.weather === 321
                                ? <LightRainSVG className={classes.icon}/> : null
                            }

                            {/* //* HEAVY RAIN */}
                            {
                                day.weather === 502 ||
                                day.weather === 503 ||
                                day.weather === 504 ||
                                day.weather === 522 ||
                                day.weather === 531 ||
                                day.weather === 511 ||
                                day.weather === 302 ||
                                day.weather === 312 ||
                                day.weather === 314
                                ? <HeavyRainSVG className={classes.icon}/> : null
                            }

                            {/* //* THUNDER RAIN */}
                            {
                                day.weather === 200 ||
                                day.weather === 201 ||
                                day.weather === 202 ||
                                day.weather === 210 ||
                                day.weather === 210 ||
                                day.weather === 211 ||
                                day.weather === 212 ||
                                day.weather === 221 ||
                                day.weather === 230 ||
                                day.weather === 231 ||
                                day.weather === 232
                                ? <ThunderSVG className={classes.icon}/> : null
                            }

                            {/* //* CLOUDY */}
                            {
                                day.weather === 803 || day.weather === 804
                                ? <CloudySVG className={classes.icon}/> : null
                            }

                            {/* //* OVERCAST */}
                            {
                                day.weather === 801 || day.weather === 802
                                ? <OvercastSVG className={classes.icon}/> : null
                            }


                            {/* //* SUNNY */}
                            {
                                day.weather === 800 && time == 'day'
                                ? <SunnySVG className={classes.icon}/> : null
                            }

                            {/* //* NIGHT */}
                            {
                                day.weather === 500 && time == 'night'
                                ? <NightSVG className={classes.icon}/> : null
                            }







                        </div>
                    </div>
                </div>
                ))}
            </div>
    
        </div>
    );
};

export default WeatherContainer;
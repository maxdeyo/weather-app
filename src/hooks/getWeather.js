import React, { useState, useEffect } from 'react';

//Sample URL: https://api.weatherapi.com/v1/current.json?key=03f7f5f4881f4e9cbdc225240210307&q=London
const URL = 'https://api.weatherapi.com/v1/current.json?key='
const API_KEY = '03f7f5f4881f4e9cbdc225240210307';
const BASE_URL = URL+API_KEY+'&q=';

const FORECAST_URL = 'https://api.weatherapi.com/v1/current.json?key='
const FORECAST_BASE_URL = FORECAST_URL+API_KEY+'&q=';

const GetWeather = (userLocation) => {
    
    const [url, setUrl] = useState(BASE_URL+'48.8567,2.3508');
    const [forecastUrl, setForecastUrl] = useState(FORECAST_BASE_URL+'48.8567,2.3508'+'&days=7');
    const [loading, setLoading] = useState(true);
    const [weather, setWeather] = useState();
    const [forecast, setForecast] = useState();

    useEffect(()=>{
        if(!userLocation.loading&&userLocation.location.latitude&&userLocation.location.longitude){
            setUrl(BASE_URL+userLocation.location.latitude+','+userLocation.location.longitude);
            setForecastUrl(FORECAST_BASE_URL+userLocation.location.latitude+','+userLocation.location.longitude+'&days=7');
        }
    }, [userLocation]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await fetch(url);
            const data = await res.json();

            const forecastRes = await fetch(forecastUrl);
            const forecastData = await forecastRes.json();

            setWeather(data);
            setForecast(forecastData);
            setLoading(false);
        }
        fetchData();
    }, [url]);

    return { weather, loading, forecast };
}

export default GetWeather;
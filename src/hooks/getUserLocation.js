import { useState, useEffect } from "react";

const GetUserLocation = () => {
    const [error, setError] = useState();
    const [location, setLocation] = useState();
    const [loading, setLoading] = useState(true);

    const handleSuccess = position => {
        const { latitude, longitude } = position.coords;

        setLocation({
            latitude,
            longitude
        });

        setLoading(false);
    };
    const handleError = error => setError(error.message);

    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    
    useEffect(()=>{
        if(!navigator.geolocation) {
            setError('Can not access geolocation');
            return;
        }
        navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    }, []);
    return { location, error, loading };
}

export default GetUserLocation;
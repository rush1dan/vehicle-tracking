'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios';

const default_address = "Dhaka, Bangladesh";

async function getReverseGeoCoding(lat, lon) {
    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=geocodejson&zoom=18`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Edg/117.0.2045.31'
            }
        });

        const geo_data = response.data.features[0].properties.geocoding;
        const address = `${geo_data.name ? geo_data.name + ', ' : ''}
        ${geo_data.street ? geo_data.street + ', ' : ''}
        ${geo_data.locality ? geo_data.locality + ', ' : ''}
        ${geo_data.district ? geo_data.district + ', ' : ''}
        ${geo_data.city ? geo_data.city : ''}`;

        return address;
    } catch (error) {
        console.log("Error: " + error.message);
        return default_address;
    }
}

const Address = ({ className, latlondata, selected }) => {
    const [address, setAddress] = useState(`Lat: ${latlondata.lat}, Lon: ${latlondata.lon}`);
    useEffect(() => {
        if (selected) {
            const fetchLocation = async () => {
                const location = await getReverseGeoCoding(latlondata.lat, latlondata.lon);
                setAddress(location);
            }
            fetchLocation();
        }
    }, [selected]);
    return (
        <p className={className}>
            {address}
        </p>
    )
}

export default Address
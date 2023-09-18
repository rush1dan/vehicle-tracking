'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios';

const default_address = "Dhaka, Bangladesh";

async function getReverseGeoCoding(lat, lon) {
    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&zoom=18`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Edg/117.0.2045.31'
            }
        });
        const address = response.data.display_name;
        return address;
    } catch (error) {
        console.log("Error: " + error.message);
        return default_address;
    }
}

const Address = (props) => {
    // const [address, setAddress] = useState(default_address);
    // useEffect(async () => {
    //     const location = await getReverseGeoCoding(props.data.lat, props.data.lon);
    //     setAddress(location);
    // }, [props.data]);
    return (
        <p className={props.className}>
            Latitude: {props.data.lat}, Longitude: {props.data.lon}
        </p>
    )
}

export default Address
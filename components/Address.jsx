'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios';

const default_address = "Dhaka, Bangladesh";

async function getLocation(lat, lon) {
    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&zoom=18`);
        const address = response.data.display_name;
        return address;
    } catch (error) {
        console.log("Error: " + error.message);
        return default_address;
    }
}

const Address = (props) => {
    const [address, setAddress] = useState(default_address);
    useEffect(async () => {
        const location = await getLocation(props.data.lat, props.data.lon);
        setAddress(location);
    }, [props.data])
    return (
        <p className={props.className}>
            {address}
        </p>
    )
}

export default Address
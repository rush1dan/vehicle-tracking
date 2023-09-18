'use client'

import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
const myIcon = new L.Icon({
 iconUrl: '/marker_red.png',
 iconSize: [32,32]
})

const dhakaLatLang = [23.762, 90.3899];

const MapControls = (props) => {
    const map = useMap();
    map.setView(props.position);
    return null;
}

const LeafletMap = (props) => {
    const [isMounted, setIsMounted] = useState(false);
    const [position, setPosition] = useState([51.505, -0.09]);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) {
        return null;
    }
    return (
        <div className={`${props.className} relative`}>
            <MapContainer center={position} zoom={13} scrollWheelZoom={true} className='w-full h-full'>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} icon={myIcon} >
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
                <MapControls position={position} />
            </MapContainer>
            <button onClick={() => setPosition(dhakaLatLang)} className='px-4 py-2 bg-slate-500 text-white absolute z-[10000] bottom-10 right-10'>
                Dhaka
            </button>
        </div>
    )
}

export default LeafletMap;

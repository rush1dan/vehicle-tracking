'use client'

import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import vehicle_data from '@/demo/vehicles';

const myRedIcon = new L.Icon({
    iconUrl: '/marker_red.png',
    iconSize: [32, 32]
});

const myGreenIcon = new L.Icon({
    iconUrl: '/marker_green.png',
    iconSize: [32, 32]
})

const dhakaLatLang = [23.762, 90.3899];

const MapControls = (props) => {
    const map = useMap();
    map.setView(props.position);
    return null;
}

const LeafletMap = (props) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) {
        return null;
    }
    return (
        <div className={`${props.className} relative`}>
            <MapContainer center={dhakaLatLang} zoom={13} scrollWheelZoom={true} className='w-full h-full'>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    props.vehicles.map((vehicle, index) => {
                        return (
                            <Marker key={index} position={[vehicle.lat, vehicle.lon]} icon={vehicle.status == 'moving' ? myGreenIcon : myRedIcon}
                                eventHandlers={{
                                    click: () => {
                                        console.log(`${vehicle.model}`);
                                    },
                                }}>
                                <Popup>
                                    {vehicle.model} <br /> {vehicle.id}
                                </Popup>
                            </Marker>
                        )
                    })
                }
            </MapContainer>
        </div>
    )
}

export default LeafletMap;

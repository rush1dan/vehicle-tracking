'use client'

import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import { useSelector, useDispatch } from 'react-redux';
import { selectVehicle } from '@/redux/selectedVehicleSlice';

const redMarker = new L.Icon({
    iconUrl: '/marker_red.png',
    iconSize: [32, 32]
});

const greenMarker = new L.Icon({
    iconUrl: '/marker_green.png',
    iconSize: [32, 32]
})

const blueMarker = new L.Icon({
    iconUrl: '/marker_blue.png',
    iconSize: [32, 32]
})

const dhakaLatLang = [23.762, 90.3899];

const MapControls = ({ position }) => {
    if (position.length > 0) {
        const map = useMap();
        map.flyTo(position);
    }
}

const LeafletMap = ({ className }) => {
    const [isMounted, setIsMounted] = useState(false);
    const [viewPos, setViewPos] = useState([]);

    const selectedVehicle = useSelector((state) => state.selectedVehicle);
    useEffect(() => {
        if (selectedVehicle.id) {
            const vehicle = { ...selectedVehicle };
            setViewPos([vehicle.lat, vehicle.lon]);
        }
    }, [selectedVehicle.id]);

    const dispatch = useDispatch();
    function clickVehicle(vehicle, position) {
        setViewPos(position);
        dispatch(selectVehicle(vehicle));
    }

    const allVehicles = useSelector((state) => state.allVehicles);

    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) {
        return null;
    }

    return (
        <div className={`${className} relative`}>
            <MapContainer center={dhakaLatLang} zoom={13} scrollWheelZoom={true} className='w-full h-full'>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    allVehicles.map((vehicle, index) => {
                        const markerPos = [vehicle.lat, vehicle.lon];
                        return (
                            <Marker key={index} position={markerPos} icon={vehicle.id === selectedVehicle.id ? blueMarker : (vehicle.status == 'moving' ? greenMarker : redMarker)}
                                eventHandlers={{
                                    click: () => {
                                        clickVehicle(vehicle, markerPos);
                                    },
                                }}>
                                <Popup>
                                    {vehicle.model} <br /> {vehicle.id}
                                </Popup>
                            </Marker>
                        )
                    })
                }
                <MapControls position={viewPos} />
            </MapContainer>
        </div>
    )
}

export default LeafletMap;

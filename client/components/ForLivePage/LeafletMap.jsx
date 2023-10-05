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
    const map = useMap();
    if (position.length > 0) {
        map.flyTo(position);
    }
}

const LeafletMap = ({ className }) => {
    const [isMounted, setIsMounted] = useState(false);
    const [viewPos, setViewPos] = useState([]);

    const allVehiclesData = useSelector((state) => state.allVehicles).vehicle_data;
    const allVehiclesList = Object.values(allVehiclesData);
    
    const selectedVehicle = useSelector((state) => state.selectedVehicle);
    useEffect(() => {
        if (selectedVehicle._id) {
            const vehicle = allVehiclesData[selectedVehicle._id];
            setViewPos([vehicle.lat, vehicle.lon]);
        }
    }, [selectedVehicle._id]);

    const dispatch = useDispatch();
    function clickVehicle(vehicle, position) {
        setViewPos(position);
        dispatch(selectVehicle(vehicle._id));
    }

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
                    allVehiclesList.map((vehicle, index) => {
                        const markerPos = [vehicle.lat, vehicle.lon];
                        return (
                            <Marker key={vehicle._id} position={markerPos} icon={vehicle._id === selectedVehicle._id ? blueMarker : (vehicle.status == 'moving' ? greenMarker : redMarker)}
                                eventHandlers={{
                                    click: () => {
                                        clickVehicle(vehicle, markerPos);
                                    },
                                }}>
                                <Popup>
                                    {vehicle.model} <br /> {vehicle.number_plate}
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

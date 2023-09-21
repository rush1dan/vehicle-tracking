'use client'

import React, { useEffect, useState } from 'react'
import LivePage from './LivePage';
import DashboardPage from './DashboardPage';
import SettingsPage from './SettingsPage';

import { useSelector, useDispatch } from 'react-redux'
import { setVehicles, updateVehicle, addVehicle, removeVehicle } from '@/redux/allVehiclesSlice';

import { io } from 'socket.io-client'
import { MyContext } from '@/redux/MyContext';
import Loading from '@/components/Loading';
import { selectVehicle } from '@/redux/selectedVehicleSlice';

let socket;

const PageLoader = ({ className }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [isDataReceived, setIsDataReceived] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        socketInitializer();
    }, []);

    const socketInitializer = async () => {
        const res = await fetch('/api/socket');
        const server_port = 5000;
        const server_url = `${window.location.protocol}//${window.location.hostname}:${server_port}`;
        socket = io(server_url);

        socket.on('connect', () => {
            console.log('connected');
            setIsConnected(true);
            socket.emit('request-data');
        });

        socket.on('serve-data', data => {
            console.log("Client: Received Initial Data");
            dispatch(setVehicles(data));
            setIsDataReceived(true);
        });

        socket.on('update-vehicle', vehicle => {
            console.log("Client: Detected Vehicle Update");
            dispatch(updateVehicle(vehicle));
        });

        socket.on('add-vehicle', vehicle => {
            console.log("Client: Detected Vehicle Addition");
            dispatch(addVehicle(vehicle));
        });

        socket.on('remove-vehicle', vehicle => {
            console.log("Client: Detected Vehicle Removal");
            dispatch(removeVehicle(vehicle));
            dispatch(selectVehicle(null));
        });
    }

    const selectedPage = useSelector((state) => state.selectedPage);

    if (!isConnected || !isDataReceived) {
        return <Loading className={'w-full h-full text-slate-900'} />
    }

    return (
        <div className={className}>
            <MyContext.Provider value={socket}>
                {
                    selectedPage.value === 'Dashboard' &&
                    <DashboardPage />
                }
                {
                    selectedPage.value === 'Live' &&
                    <LivePage />
                }
                {
                    selectedPage.value === 'Settings' &&
                    <SettingsPage />
                }
            </MyContext.Provider>
        </div>
    )
}

export {socket}
export default PageLoader
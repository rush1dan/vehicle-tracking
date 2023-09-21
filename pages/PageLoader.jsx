'use client'

import React, { useEffect, useState } from 'react'
import LivePage from './LivePage';
import DashboardPage from './DashboardPage';
import SettingsPage from './SettingsPage';

import { useSelector, useDispatch } from 'react-redux'
import { setVehicles, updateVehicle } from '@/redux/allVehiclesSlice';

import { io } from 'socket.io-client'
import { MyContext } from '@/redux/MyContext';
import Loading from '@/components/Loading';

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

        socket = io('http://localhost:5000');

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
            console.log("Client: Detected Input Update");
            dispatch(updateVehicle(vehicle));
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
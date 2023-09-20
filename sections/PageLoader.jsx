'use client'

import React, { useEffect } from 'react'
import LivePage from './LivePage';
import DashboardPage from './DashboardPage';
import SettingsPage from './SettingsPage';
import vehicle_data from '@/demo/vehicles';

import { useSelector, useDispatch } from 'react-redux'
import { setVehicles, updateVehicle } from '@/redux/allVehiclesSlice';

import { io } from 'socket.io-client'
import { MyContext } from '@/redux/MyContext';

let socket;

const PageLoader = ({ className }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        socketInitializer();
        dispatch(setVehicles(vehicle_data));
    }, []);

    const socketInitializer = async () => {
        const res = await fetch('/api/socket');
        console.log(res);
        socket = io('http://localhost:4000');
        console.log(socket);

        socket.on('connect', () => {
            console.log('connected');
        });

        socket.on('update-input', msg => {
            console.log("Client Received: ", msg);
            dispatch(updateVehicle(msg));
        });
    }

    const selectedPage = useSelector((state) => state.selectedPage);

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
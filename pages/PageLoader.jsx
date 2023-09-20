'use client'

import React, { useEffect } from 'react'
import LivePage from './LivePage';
import DashboardPage from './DashboardPage';
import SettingsPage from './SettingsPage';
import vehicle_data from '@/demo/vehicles';

import { useSelector, useDispatch } from 'react-redux'
import { setVehicles, updateVehicle } from '@/redux/allVehiclesSlice';

import io from 'socket.io-client'
import { setSocket } from '@/redux/socketSlice';
let socket

const PageLoader = ({ className }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        socketInitializer();
        dispatch(setVehicles(vehicle_data));
    }, []);

    const socketInitializer = async () => {
        const res = await fetch('/api/hello');
        console.log(res);
        socket = io();
        console.log(socket);

        socket.on('connect', () => {
            console.log('connected');
            dispatch(setSocket(socket));
        });

        socket.on('update-input', msg => {
            console.log("Client Received: ", msg);
            dispatch(updateVehicle(msg));
        });
    }

    const selectedPage = useSelector((state) => state.selectedPage);

    return (
        <div className={className}>
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

        </div>
    )
}

export default PageLoader
'use client'

import React, { useEffect, useState } from 'react'
import LivePage from './LivePage';
import DashboardPage from './DashboardPage';
import SettingsPage from './SettingsPage';

import { useSelector, useDispatch } from 'react-redux'
import { setVehicles, updateVehicle, addVehicle, removeVehicle } from '@/redux/allVehiclesSlice';

import { io } from 'socket.io-client'
import { MyContext } from '@/redux/MyContext';
import StatusComponent, { Status } from '@/components/Status';
import { selectVehicle } from '@/redux/selectedVehicleSlice';

let socket;

const PageLoader = ({ className }) => {
    const [status, setStatus] = useState(Status.pending);
    const [statusMsg, setStatusMsg] = useState('');
    const [isConnected, setIsConnected] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        socketInitializer();
    }, []);

    function errorHandler(error) {
        console.log("error");
        setStatus(Status.error);
        setStatusMsg(error.message);
    }

    const socketInitializer = async () => {
        try {
            const res = await fetch('/api/socket');
            const server_port = process.env.BACKEND_PORT;
            const server_url = `${process.env.BACKEND_URL}:${server_port}`;
            socket = io(server_url);

            socket.on('connect', () => {
                try {
                    console.log('connected');
                    setIsConnected(true);
                    socket.emit('request-data');
                } catch (error) {
                    errorHandler(error);
                }
            });

            socket.on('serve-data', data => {
                try {
                    console.log("Client: Received Initial Data");
                    dispatch(setVehicles(data));
                    setStatus(Status.success);
                } catch (error) {
                    errorHandler(error);
                }
            });

            socket.on('update-vehicle', vehicle => {
                try {
                    console.log("Client: Detected Vehicle Update");
                    dispatch(updateVehicle(vehicle));
                } catch (error) {
                    errorHandler(error);
                }
            });

            socket.on('add-vehicle', vehicle => {
                try {
                    console.log("Client: Detected Vehicle Addition");
                    dispatch(addVehicle(vehicle));
                } catch (error) {
                    errorHandler(error);
                }
            });

            socket.on('remove-vehicle', vehicle => {
                try {
                    console.log("Client: Detected Vehicle Removal");
                    dispatch(removeVehicle(vehicle));
                    dispatch(selectVehicle(null));
                } catch (error) {
                    errorHandler(error);
                }
            });


            socket.on('connect_error', error => {
                errorHandler(error);
            });

            socket.on('connect_failed', error => {
                errorHandler(error);
            });

            socket.on('disconnect', error => {
                errorHandler(error);
            });
        } catch (error) {
            errorHandler(error);
        }
    }

    const selectedPage = useSelector((state) => state.selectedPage);

    if (status !== Status.success) {
        return <StatusComponent className={'w-full h-full'} status={status} msg={statusMsg} />
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

export { socket }
export default PageLoader
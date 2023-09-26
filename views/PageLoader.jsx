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
import LoadingDisclaimer from '@/components/LoadingDisclaimer';

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
        setStatus(Status.error);
        setStatusMsg(error.message);
    }

    const socketInitializer = async () => {
        try {
            const socket_port = process.env.NEXT_PUBLIC_SOCKET_PORT;
            const server_url = process.env.NEXT_PUBLIC_BACKEND_URL;
            const app_port = process.env.NEXT_PUBLIC_APP_PORT;
            const res = await fetch(`/api/socket`);
            socket = io(`${server_url}:${socket_port}`);

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
        return (
            <div className='w-full h-full flex flex-col items-center justify-center gap-y-6 p-12'>
                <StatusComponent className={''} status={status} msg={statusMsg} />
                <LoadingDisclaimer className={'w-full max-w-7xl'} />
            </div>
        )
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
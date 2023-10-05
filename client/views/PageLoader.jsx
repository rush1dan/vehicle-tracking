'use client'

import React, { useEffect, useState } from 'react'
import LivePage from './LivePage';
import DashboardPage from './DashboardPage';
import SettingsPage from './SettingsPage';

import { useSelector, useDispatch } from 'react-redux'
import { setVehicles, updateVehicle, addVehicle, removeVehicle } from '@/redux/allVehiclesSlice';

import { io } from 'socket.io-client'
import { MyContext } from '@/redux/MyContext';
import StatusComponent, { Status } from '@/components/Common/Status';
import { selectVehicle } from '@/redux/selectedVehicleSlice';
import LoadingDisclaimer from '@/components/Common/LoadingDisclaimer';

import { useSession } from 'next-auth/react';
import { connect, disconnect } from '@/redux/connectionSlice';

let socket;

const PageLoader = ({ className }) => {
    const [fetchStatus, setStatus] = useState(Status.pending);
    const [statusMsg, setStatusMsg] = useState('');

    const { data: session, status } = useSession();
    const userId = session?.user?.id;

    const connected = useSelector((state) => state.connected);      //useState wont work as it doesn't maintain state on page routing

    const dispatch = useDispatch();
    useEffect(() => {
        if (status === 'authenticated') {
            if (!connected.value) {
                socketInitializer(userId);
            }
        } else if (status === 'unauthenticated') {
            if (connected.value) {
                socket?.disconnect();
                dispatch(disconnect());
            }
        }
    }, [status, userId]);

    function errorHandler(error) {
        setStatus(Status.error);
        setStatusMsg(error.message);
    }

    const socketInitializer = async (userId) => {
        try {
            const backend_port = process.env.NEXT_PUBLIC_BACKEND_PORT;
            const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;
            const backend_location = backend_url.includes("localhost") ? `${backend_url}:${backend_port}` : backend_url;
            const res = await fetch(`${backend_location}/socket`);
            socket = io(backend_location);

            socket.on('connect', () => {
                try {
                    dispatch(connect());
                    socket.emit('request-data', userId);
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
                console.log("Disconnected From Socket");
                errorHandler(error);
            });
        } catch (error) {
            errorHandler(error);
        }
    }

    const selectedPage = useSelector((state) => state.selectedPage);

    if (fetchStatus !== Status.success) {
        return (
            <div className='w-full h-full flex flex-col items-center justify-center gap-y-6 p-12'>
                <StatusComponent className={''} status={fetchStatus} msg={statusMsg} />
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
'use client'

import React, { useEffect } from 'react'
import LivePage from './LivePage';
import DashboardPage from './DashboardPage';
import SettingsPage from './SettingsPage';
import vehicle_data from '@/demo/vehicles';

import { useSelector, useDispatch } from 'react-redux'
import { setVehicles } from '@/redux/allVehiclesSlice';

const PageLoader = ({ className }) => {
    const dispatch = useDispatch();
    useEffect(() => { 
        dispatch(setVehicles(vehicle_data));
    }, []);
    
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
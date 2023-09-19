'use client'

import React from 'react'
import { useSelector } from 'react-redux'
import LivePage from './LivePage';
import DashboardPage from './DashboardPage';
import SettingsPage from './SettingsPage';

const PageLoader = (props) => {
    const selectedPage = useSelector((state) => state.selectedPage);

    return (
        <div className={props.className}>
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
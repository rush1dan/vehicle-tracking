'use client'

import React from 'react'
import LiveFeedCard from './LiveFeedCard'
import { useDispatch, useSelector } from 'react-redux'
import { selectTab } from '@/redux/selectedTabSlice'
import VehicleCard from './VehicleCard'

const LiveFeed = ({ className }) => {
    const selectedTab = useSelector((state) => state.selectedTab);
    const selectedVehicle = useSelector((state) => state.selectedVehicle);

    const allVehicles = Object.values(useSelector((state) => state.allVehicles));
    const movingVehicles = allVehicles.filter((vehicle) => vehicle.status === 'moving');
    const idleVehicles = allVehicles.filter((vehicle) => vehicle.status === 'idle');

    const vehicleList = selectedTab.value === 'All Vehicles' ? allVehicles : (selectedTab.value === 'Moving' ? movingVehicles : idleVehicles);

    return (
        <div className={className}>
            <div className='w-full h-full'>
                <Tabs className={'w-full h-24'} allVehicleCount={allVehicles.length} movingVehicleCount={movingVehicles.length}
                    idleVehicleCount={idleVehicles.length} selectedVehicleCount={selectedVehicle.id ? 1 : 0} />
                {
                    selectedTab.value !== 'Selected' &&
                    <CardList className={'w-full h-[calc(100%-6rem)]'} vehicles={vehicleList} />
                }

                {
                    selectedTab.value === 'Selected' &&
                    <VehicleCard className={'w-full h-[calc(100%-6rem)]'} vehicle={selectedVehicle} />
                }
            </div>
        </div>
    )
}

const Tabs = ({ className, allVehicleCount = 0, movingVehicleCount = 0, idleVehicleCount = 0, selectedVehicleCount = 0 }) => {
    const selectedTab = useSelector((state) => state.selectedTab);

    return (
        <div className={className}>
            <div className='w-full h-full flex flex-row items-center justify-center'>
                <Tab className='w-24 rounded-tl-md overflow-clip' title={'All Vehicles'} bgColorClass={'bg-[#465691]'} textColorClass={'text-white'} count={allVehicleCount}
                    selected={selectedTab.value == 'All Vehicles'} selectedColorClass={'bg-slate-100'} />
                <Tab className='w-24' title={'Moving'} bgColorClass={'bg-green-300'} textColorClass={'text-green-600'} count={movingVehicleCount}
                    selected={selectedTab.value == 'Moving'} selectedColorClass={'bg-green-600'} />
                <Tab className='w-24' title={'Idle'} bgColorClass={'bg-red-300'} textColorClass={'text-red-600'} count={idleVehicleCount}
                    selected={selectedTab.value == 'Idle'} selectedColorClass={'bg-red-600'} />
                <Tab className='w-24 rounded-tr-md overflow-clip' title={'Selected'} bgColorClass={'bg-blue-300'} textColorClass={'text-blue-600'} count={selectedVehicleCount}
                    selected={selectedTab.value == 'Selected'} selectedColorClass={'bg-blue-600'} />
            </div>
        </div>
    )
}

const Tab = ({ className, title, count, bgColorClass, textColorClass, selected, selectedColorClass }) => {
    const dispatch = useDispatch();

    return (
        <div className={className}>
            <div className='relative cursor-pointer hover:ring-1' onClick={() => dispatch(selectTab(title))}>
                <div className={`py-2 flex flex-col items-center justify-between ${bgColorClass}`}>
                    <p className={`text-xl font-bold ${textColorClass}`}>{count}</p>
                    <p className={`text-xs font-semibold ${textColorClass}`}>{title}</p>
                </div>
                {
                    selected && <div className={`w-full h-[0.4rem] z-10 ${selectedColorClass} absolute bottom-0`} />
                }
            </div>
        </div>
    )
}

const CardList = ({ className, vehicles }) => {
    return (
        <div className={className}>
            <div className='w-full h-full p-4 flex flex-col items-start gap-y-4 overflow-y-auto'>
                {
                    vehicles.map((vehicle, index) => {
                        return (
                            <div key={vehicle.id} className='w-full'>
                                <LiveFeedCard className={'w-full h-20'} vehicle={vehicle} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default LiveFeed
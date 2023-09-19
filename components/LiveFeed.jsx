'use client'

import React from 'react'
import vehicle_data from '@/demo/vehicles'
import LiveFeedCard from './LiveFeedCard'

const LiveFeed = (props) => {
    return (
        <div className={props.className}>
            <div className='w-full h-full'>
                <Tabs className={'w-full h-24'} />
                <CardList className={'w-full h-[calc(100%-6rem)]'} vehicles={vehicle_data} />
            </div>
        </div>
    )
}

const Tabs = (props) => {
    const allVehicles = vehicle_data.length;
    const movingVehicles = vehicle_data.filter((vehicle) => vehicle.status === 'moving').length;
    const idleVehicles = vehicle_data.filter((vehicle) => vehicle.status === 'idle').length;
    return (
        <div className={props.className}>
            <div className='w-full h-full flex flex-row items-center justify-center'>
                <Tab className='w-24 rounded-tl-md overflow-clip' title={'All Vehicles'} bgColorClass={'bg-[#465691]'} textColorClass={'text-white'} count={allVehicles} />
                <Tab className='w-24' title={'Moving'} bgColorClass={'bg-green-300'} textColorClass={'text-green-600'} count={movingVehicles} selected={true} selectedColorClass={'bg-green-600'} />
                <Tab className='w-24' title={'Idle'} bgColorClass={'bg-red-300'} textColorClass={'text-red-600'} count={idleVehicles} />
                <Tab className='w-24 rounded-tr-md overflow-clip' title={'Selected'} bgColorClass={'bg-blue-300'} textColorClass={'text-blue-600'} count={0} />
            </div>
        </div>
    )
}

const Tab = ({ className, title, count, bgColorClass, textColorClass, selected, selectedColorClass }) => {
    return (
        <div className={className}>
            <div className='relative cursor-pointer'>
                <div className={`py-2 flex flex-col items-center justify-between ${bgColorClass}`}>
                    <p className={`text-xl font-bold ${textColorClass}`}>{count}</p>
                    <p className={`text-xs font-semibold ${textColorClass}`}>{title}</p>
                </div>
                {
                    selected && <div className={`w-full h-2 z-10 ${selectedColorClass} absolute bottom-0`} />
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
                    vehicles.map((data, index) => {
                        return (
                            <div key={data.id} className='w-full'>
                                <LiveFeedCard index={index} className={'w-full h-20'} data={data} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default LiveFeed
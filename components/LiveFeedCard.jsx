'use client'

import React, { useEffect, useState } from 'react'
import Address from './Address'
import { useSelector, useDispatch } from 'react-redux'
import { selectVehicle } from '@/redux/selectedVehicleSlice'

const LiveFeedCard = ({ className, vehicle }) => {
    const dispatch = useDispatch();
    const selectedVehicle = useSelector((state) => state.selectedVehicle);
    const [isSelected, setIsSelected] = useState(false);
    useEffect(() => { 
        if (selectedVehicle.id === vehicle.id)
        {
            if (!isSelected) {
                setIsSelected(true);
            }
        }
        else if(isSelected) {
            setIsSelected(false);
        }
    }, [selectedVehicle]);

    return (
        <div className={className}>
            <div className={`w-full h-full bg-slate-100 shadow-md shadow-slate-900/10 rounded-md p-2 cursor-pointer hover:ring-2 
                ${isSelected ? 'ring-4' : ''}`}
                 onClick={() => dispatch(selectVehicle(vehicle))}>
                <div className='w-full h-full flex flex-row items-center justify-between gap-x-4'>
                    <div className='h-3/4 aspect-square rounded-md bg-slate-400'>
                    </div>
                    <div className='grow flex flex-col justify-between items-start'>
                        <p>{vehicle.model}</p>
                        <p>{vehicle.id}</p>
                        <Address className={'text-xs'} latlondata={{ lat: vehicle.lat, lon: vehicle.lon }} selected={isSelected} />
                    </div>
                    <div className='h-full flex flex-col justify-start items-center'>
                        <div className={`w-16 h-6 rounded-md flex justify-center items-center ${vehicle.status == 'moving' ? 'bg-green-300' : 'bg-red-300'}`}>
                            <p className={`${vehicle.status == 'moving' ? 'text-green-600' : 'text-red-600'} 
                            font-semibold text-sm`}>{vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LiveFeedCard
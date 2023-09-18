'use client'

import React, { useEffect, useState } from 'react'
import Address from './Address'
import { useSelector, useDispatch } from 'react-redux'
import { selectVehicle } from '@/redux/selectedVehicleSlice'

const LiveFeedCard = (props) => {
    const dispatch = useDispatch();
    const selectedVehicle = useSelector((state) => state.selectedVehicle);
    const [isHighlighted, setIsHighlighted] = useState(false);
    useEffect(() => { 
        if (selectedVehicle.id === props.data.id)
        {
            if (!isHighlighted) {
                setIsHighlighted(true);
            }
        }
        else if(isHighlighted) {
            setIsHighlighted(false);
        }
    }, [selectedVehicle]);

    return (
        <div className={props.className}>
            <div className={`w-full h-full bg-slate-100 shadow-md shadow-slate-900/10 rounded-md p-2 cursor-pointer hover:ring-2 
                ${isHighlighted ? 'ring-4' : ''}`}
                 onClick={() => dispatch(selectVehicle({index: props.index, id: props.data.id}))}>
                <div className='w-full h-full flex flex-row items-center justify-between gap-x-4'>
                    <div className='h-3/4 aspect-square rounded-md bg-slate-400'>
                    </div>
                    <div className='grow flex flex-col justify-between items-start'>
                        <p>{props.data.model}</p>
                        <p>{props.data.id}</p>
                        <Address className={'text-xs'} data={{lat: props.data.lat, lon: props.data.lon}} />
                    </div>
                    <div className='h-full flex flex-col justify-start items-center'>
                        <div className={`w-16 h-6 rounded-md flex justify-center items-center ${props.data.status == 'moving' ? 'bg-green-300' : 'bg-red-300'}`}>
                            <p className={`${props.data.status == 'moving' ? 'text-green-600' : 'text-red-600'} 
                            font-semibold text-sm`}>{props.data.status.charAt(0).toUpperCase() + props.data.status.slice(1)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LiveFeedCard
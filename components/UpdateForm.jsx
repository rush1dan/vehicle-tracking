import React from 'react'

import { useSelector } from 'react-redux';

const locationUpdateDelta = 0.001;

const UpdateForm = ({ className, vehicle }) => {
    const socket = useSelector((state) => state.socket.value);

    function updateLatitude(sign) {
        const updatedVehicle = { ...vehicle, lat: (vehicle.lat + sign * locationUpdateDelta) };
        socket.emit('input-change', updatedVehicle);
    }

    function updateLongitude(sign) {
        const updatedVehicle = { ...vehicle, lon: (vehicle.lon + sign * locationUpdateDelta) };
        socket.emit('input-change', updatedVehicle);
    }

    function updateStatus() {
        const updatedVehicle = { ...vehicle, status: (vehicle.status === 'moving' ? 'idle' : 'moving') };
        socket.emit('input-change', updatedVehicle);
    }

    return (
        <div className={className}>
            <div className='w-full flex flex-col items-center justify-start gap-y-2'>
                <p className='text-xl font-bold underline'>Edit</p>
                <div className='w-full border-2 border-gray-500 rounded-md flex flex-col items-center justify-start p-4 gap-y-6'>
                    <div className='w-full flex flex-row items-center justify-center gap-x-4'>
                        <p className='w-10 font-semibold text-xl text-gray-500'>Lat:</p>
                        <div className='flex flex-row items-center justify-start'>
                            <button className='w-10 h-10 bg-white border-2 border-gray-600 text-center text-3xl'
                                onClick={() => updateLatitude(1)}>+</button>
                            <input type="text" className='w-20 h-10 border-2 border-gray-600 text-center text-lg font-light'
                                value={vehicle.lat.toFixed(4)} readOnly />
                            <button className='w-10 h-10 bg-white border-2 border-gray-600 text-center text-3xl'
                                onClick={() => updateLatitude(-1)}>-</button>
                        </div>
                    </div>
                    <div className='w-full flex flex-row items-center justify-center gap-x-4'>
                        <p className='w-10 font-semibold text-xl text-gray-500'>Lon:</p>
                        <div className='flex flex-row items-center justify-start'>
                            <button className='w-10 h-10 bg-white border-2 border-gray-600 text-center text-3xl'
                                onClick={() => updateLongitude(1)}>+</button>
                            <input type="text" className='w-20 h-10 border-2 border-gray-600 text-center text-lg font-light'
                                value={vehicle.lon.toFixed(4)} readOnly />
                            <button className='w-10 h-10 bg-white border-2 border-gray-600 text-center text-3xl'
                                onClick={() => updateLongitude(-1)}>-</button>
                        </div>
                    </div>
                    <button className={`px-4 py-4 font-semibold ${vehicle.status == 'idle' ? 'text-green-600' : 'text-red-600'} ${vehicle.status == 'idle' ? 'bg-green-300' : 'bg-red-300'} rounded-md`}
                        onClick={() => updateStatus()}>
                        Change Status
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UpdateForm
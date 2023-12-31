import { MyContext } from '@/redux/MyContext';
import React, { useContext } from 'react'

const locationUpdateDelta = 0.001;

const UpdateForm = ({ className, vehicle }) => {

    const socket = useContext(MyContext);

    function updateLatitude(sign) {
        const updatedVehicle = { ...vehicle, lat: (vehicle.lat + sign * locationUpdateDelta) };
        socket.emit('vehicle-update', updatedVehicle);
    }

    function updateLongitude(sign) {
        const updatedVehicle = { ...vehicle, lon: (vehicle.lon + sign * locationUpdateDelta) };
        socket.emit('vehicle-update', updatedVehicle);
    }

    function updateStatus() {
        const updatedVehicle = { ...vehicle, status: (vehicle.status === 'moving' ? 'idle' : 'moving') };
        socket.emit('vehicle-update', updatedVehicle);
    }

    return (
        <div className={className}>
            <div className='w-full flex flex-col items-center justify-start gap-y-2'>
                <p className='text-xl text-gray-500 font-bold'>For Demo Data Change:</p>
                <div className='w-full border-2 border-gray-500 rounded-md flex flex-col items-center justify-start p-4 gap-y-6'>
                    <div className='w-full flex flex-row items-center justify-center gap-x-4'>
                        <p className='w-10 font-semibold text-xl text-gray-500'>Lat:</p>
                        <div className='flex flex-row items-center justify-start'>
                            <button className='w-10 h-10 bg-white border-2 border-gray-600 text-center text-3xl rounded-tl-full rounded-bl-full'
                                onClick={() => updateLatitude(1)}>+</button>
                            <input type="text" className='w-24 h-10 border-2 border-gray-600 text-center text-base font-light'
                                value={vehicle.lat.toFixed(4)} readOnly />
                            <button className='w-10 h-10 bg-white border-2 border-gray-600 text-center text-3xl rounded-tr-full rounded-br-full'
                                onClick={() => updateLatitude(-1)}>-</button>
                        </div>
                    </div>
                    <div className='w-full flex flex-row items-center justify-center gap-x-4'>
                        <p className='w-10 font-semibold text-xl text-gray-500'>Lon:</p>
                        <div className='flex flex-row items-center justify-start'>
                            <button className='w-10 h-10 bg-white border-2 border-gray-600 text-center text-3xl rounded-tl-full rounded-bl-full'
                                onClick={() => updateLongitude(1)}>+</button>
                            <input type="text" className='w-24 h-10 border-2 border-gray-600 text-left text-base font-light'
                                value={vehicle.lon.toFixed(4)} readOnly />
                            <button className='w-10 h-10 bg-white border-2 border-gray-600 text-center text-3xl rounded-tr-full rounded-br-full'
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
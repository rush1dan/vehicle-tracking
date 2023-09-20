import React from 'react'

import { useDispatch } from 'react-redux';
import { updateVehicle } from '@/redux/allVehiclesSlice';
import { selectVehicle } from '@/redux/selectedVehicleSlice';


const UpdateForm = ({ className, vehicle }) => {
    const dispatch = useDispatch();
    return (
        <div className={className}>
            <div className='w-full flex flex-col items-center justify-start gap-y-2'>
                <p className='text-xl font-bold underline'>Edit</p>
                <div className='w-full border-2 border-gray-500 rounded-md flex flex-col items-center justify-start p-4 gap-y-6'>
                    <div className='w-full flex flex-row items-center justify-center gap-x-4'>
                        <p className='w-10 font-semibold text-xl text-gray-500'>Lat:</p>
                        <div className='flex flex-row items-center justify-start'>
                            <button className='w-10 h-10 bg-white border-2 border-gray-600 text-center text-3xl'>+</button>
                            <input type="text" className='w-20 h-10 border-2 border-gray-600 text-center text-lg font-light' value={vehicle.lat} />
                            <button className='w-10 h-10 bg-white border-2 border-gray-600 text-center text-3xl'>-</button>
                        </div>
                    </div>
                    <div className='w-full flex flex-row items-center justify-center gap-x-4'>
                        <p className='w-10 font-semibold text-xl text-gray-500'>Lon:</p>
                        <div className='flex flex-row items-center justify-start'>
                            <button className='w-10 h-10 bg-white border-2 border-gray-600 text-center text-3xl'>+</button>
                            <input type="text" className='w-20 h-10 border-2 border-gray-600 text-center text-lg font-light' value={vehicle.lon} />
                            <button className='w-10 h-10 bg-white border-2 border-gray-600 text-center text-3xl'>-</button>
                        </div>
                    </div>
                    <button className={`px-4 py-4 font-semibold ${vehicle.status == 'idle' ? 'text-green-600' : 'text-red-600'} ${vehicle.status == 'idle' ? 'bg-green-300' : 'bg-red-300'} rounded-md`}
                        onClick={() => {
                            const updatedVehicle = { ...vehicle, status: (vehicle.status === 'moving' ? 'idle' : 'moving') };
                            dispatch(updateVehicle(updatedVehicle));
                            dispatch(selectVehicle(updatedVehicle));
                        }}>
                        Change Status
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UpdateForm
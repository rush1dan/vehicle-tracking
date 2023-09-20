import Image from 'next/image'
import React from 'react'
import { useDispatch } from 'react-redux';
import { updateVehicle } from '@/redux/allVehiclesSlice';
import { selectVehicle } from '@/redux/selectedVehicleSlice';

const VehicleCard = ({ className, vehicle }) => {

    let vehicle_pic = '/placeholder_image.svg'
    switch (vehicle.category) {
        case 'car':
            vehicle_pic = '/car.svg';
            break;
        case 'bus':
            vehicle_pic = '/bus.svg';
            break;
        case 'truck':
            vehicle_pic = '/truck.svg';
            break;
        default:
            break;
    }

    const dispatch = useDispatch();

    return (
        <div className={className}>
            <div className='w-full h-full p-6'>
                <div className='w-full h-full bg-slate-100 rounded-md shadow-lg shadow-slate-800/10 p-6 overflow-y-auto'>
                    <div className='w-full flex flex-col items-center justify-start gap-y-6'>
                        <div className='w-48 h-32 bg-gray-200 rounded-md'>
                            <div className='w-full h-full relative'>
                                <Image src={vehicle_pic} alt='vehicle pic' loading='lazy' fill />
                                <div className={`w-16 h-6 rounded-md flex justify-center items-center 
                                    ${vehicle.status == 'moving' ? 'bg-green-300' : 'bg-red-300'} 
                                    absolute top-2 right-2`}>
                                    <p className={`${vehicle.status == 'moving' ? 'text-green-600' : 'text-red-600'} 
                                    font-semibold text-sm`}>{vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}</p>
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex flex-col items-center justify-start gap-y-3'>
                            <p className='font-bold text-xl'>{vehicle.model}</p>
                            <p className='font-bold text-lg text-slate-600'>{vehicle.id}</p>
                        </div>
                        <div className='w-64 h-40 bg-sky-950 rounded-md'>
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
        </div>
    )
}

export default VehicleCard
import Image from 'next/image'
import React from 'react'
import UpdateForm from './UpdateForm';
import Address from './Address';

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

    return (
        <div className={className}>
            <div className='w-full h-full p-6'>
                <div className='w-full h-full bg-slate-100 rounded-md shadow-lg shadow-slate-800/10 p-6 overflow-y-auto'>
                    <div className='w-full flex flex-col items-center justify-start gap-y-6'>
                        <div className='w-48 h-32 bg-slate-300 rounded-md'>
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
                        <p className='font-semibold'>Location: {vehicle.lat.toFixed(4)}, {vehicle.lon.toFixed(4)}</p>
                        <div className='flex flex-row items-center justify-start gap-x-2'>
                            <p className='font-semibold'>Address: </p>
                            <Address className={'text-base w-[8.7rem] h-24 flex flex-col items-start justify-center'} latlondata={{ lat: vehicle.lat, lon: vehicle.lon }} selected={true} />
                        </div>
                        <UpdateForm className={'w-full'} vehicle={vehicle} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VehicleCard
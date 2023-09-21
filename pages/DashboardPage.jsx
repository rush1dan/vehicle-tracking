import Image from 'next/image';
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectVehicle } from '@/redux/selectedVehicleSlice'
import AddForm from '@/components/AddForm';

const DashboardPage = () => {
    const allVehiclesData = useSelector((state) => state.allVehicles);
    const allVehiclesList = Object.values(allVehiclesData);
    const movingVehiclesList = allVehiclesList.filter((vehicle) => vehicle.status === 'moving');
    const idleVehiclesList = allVehiclesList.filter((vehicle) => vehicle.status === 'idle');

    return (
        <div className='w-full h-full'>
            <div className='w-full h-full flex flex-col items-center justify-start'>
                <div className='w-full h-full p-4 max-w-7xl flex flex-col items-center justify-start gap-y-20'>
                    <div className='w-full flex flex-row items-center justify-start gap-x-8'>
                        <InfoBox className={'w-40 h-24'} status={'All'} vehicleCount={allVehiclesList.length} />
                        <InfoBox className={'w-40 h-24'} status={'Moving'} vehicleCount={movingVehiclesList.length} />
                        <InfoBox className={'w-40 h-24'} status={'Idle'} vehicleCount={idleVehiclesList.length} />
                    </div>
                    <AddButton />
                    <VehiclesList className={'w-full h-[32rem]'} vehicles={allVehiclesList} />
                </div>
            </div>
        </div>
    )
}

const InfoBox = ({ className, status, vehicleCount }) => {

    let vehicle_pic = '/placeholder_image.svg'
    switch (status) {
        case 'All':
            vehicle_pic = '/car-general-black.svg';
            break;
        case 'Moving':
            vehicle_pic = '/car-general-green.svg';
            break;
        case 'Idle':
            vehicle_pic = '/car-general-red.svg';
            break;
        default:
            break;
    }

    return (
        <div className={className}>
            <div className={`w-full h-full p-4 rounded-lg ${status === 'All' ? 'bg-slate-300 text-slate-800' :
                (status === 'Moving' ? 'bg-green-300 text-green-600' : 'bg-red-300 text-[#ff0000]')}`}>
                <div className='w-full h-full flex flex-row items-center justify-start gap-x-4'>
                    <div className='w-12 h-12 relative'>
                        <Image src={vehicle_pic} alt='icon' fill />
                    </div>
                    <div className='flex flex-col items-start justify-center'>
                        <p className='font-bold text-lg'>{status}</p>
                        <p className='font-semibold text-xl'>{vehicleCount}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const AddButton = () => {
    const [formOpen, setFormOpen] = useState(false);
    return (
        <>
            <button className={`px-8 py-4 rounded-lg text-2xl text-white font-semibold tracking-wider bg-blue-400 hover:bg-blue-500 ${formOpen ? 'invisible' : 'visible'}`}
                onClick={() => setFormOpen(true)}>
                ADD
            </button>
            {
                formOpen &&
                <AddForm className={'absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10'} close={() => setFormOpen(false)} />
            }
        </>
    )
}

const VehiclesList = ({ className, vehicles }) => {
    return (
        <div className={className}>
            <div className='w-full h-full px-4 md:py-4 flex flex-col items-start gap-y-4 overflow-y-auto'>
                {
                    vehicles.map((vehicle, index) => {
                        return (
                            <div key={vehicle.id} className='w-full'>
                                <VehiclesListItem className={'w-full h-20'} vehicle={vehicle} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

const VehiclesListItem = ({ className, vehicle }) => {
    const dispatch = useDispatch();
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
            <div className={`w-full h-full bg-slate-100 shadow-md shadow-slate-900/10 rounded-md p-4`}
                onClick={() => {
                    dispatch(selectVehicle(vehicle.id));
                }}>
                <div className='w-full h-full flex flex-row items-center justify-between gap-x-8'>
                    <div className='h-full aspect-square rounded-md bg-slate-300 relative'>
                        <Image src={vehicle_pic} alt='vehicle pic' loading='lazy' fill />
                    </div>
                    <div className='grow flex flex-col justify-between items-start'>
                        <p>{vehicle.model}</p>
                        <p>{vehicle.id}</p>
                        {/* <Address className={'text-xs'} latlondata={{ lat: vehicle.lat, lon: vehicle.lon }} selected={isSelected} /> */}
                        <div className={`w-16 h-6 rounded-md flex justify-center items-center ${vehicle.status == 'moving' ? 'bg-green-300' : 'bg-red-300'}`}>
                            <p className={`${vehicle.status == 'moving' ? 'text-green-600' : 'text-red-600'} 
                            font-semibold text-sm`}>{vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}</p>
                        </div>
                    </div>
                    <div className='h-full flex flex-col justify-center items-center'>
                        <button className='px-4 py-2 bg-red-500 hover:bg-red-600 text-red-950 rounded-md '>
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage
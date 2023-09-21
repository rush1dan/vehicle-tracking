import Image from 'next/image';
import React from 'react'
import { useSelector } from 'react-redux';

const DashboardPage = () => {
    const selectedVehicle = useSelector((state) => state.selectedVehicle);

    const allVehiclesData = useSelector((state) => state.allVehicles);
    const allVehiclesList = Object.values(allVehiclesData);
    const movingVehiclesList = allVehiclesList.filter((vehicle) => vehicle.status === 'moving');
    const idleVehiclesList = allVehiclesList.filter((vehicle) => vehicle.status === 'idle');

    return (
        <div className='w-full h-full'>
            <div className='w-full h-full flex flex-col items-center justify-start'>
                <div className='w-full h-full p-4 max-w-7xl'>
                    <div className='flex flex-row items-center justify-start gap-x-8'>
                        <InfoBox className={'w-40 h-24'} status={'All'} vehicleCount={allVehiclesList.length} />
                        <InfoBox className={'w-40 h-24'} status={'Moving'} vehicleCount={movingVehiclesList.length} />
                        <InfoBox className={'w-40 h-24'} status={'Idle'} vehicleCount={idleVehiclesList.length} />
                    </div>
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

export default DashboardPage
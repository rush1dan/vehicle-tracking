import Image from 'next/image';
import React, { useState, useContext } from 'react'
import { useSelector } from 'react-redux';
import AddForm from '@/components/ForDashboardPage/AddForm';
import { MyContext } from '@/redux/MyContext';
import EditForm from '@/components/ForDashboardPage/EditForm';

const DashboardPage = () => {
    const allVehiclesData = useSelector((state) => state.allVehicles).vehicle_data;
    const allVehiclesList = Object.values(allVehiclesData);
    const movingVehiclesList = allVehiclesList.filter((vehicle) => vehicle.status === 'moving');
    const idleVehiclesList = allVehiclesList.filter((vehicle) => vehicle.status === 'idle');

    return (
        <div className='w-full h-full'>
            <div className='w-full h-full flex flex-col items-center justify-start overflow-y-auto'>
                <div className='w-full h-full p-4 max-w-7xl flex flex-col items-center justify-start md:gap-y-20 gap-y-8'>
                    <div className='w-full flex md:flex-row flex-col items-center justify-start md:gap-x-8 gap-y-4'>
                        <InfoBox className={'w-40 md:h-24'} status={'All'} vehicleCount={allVehiclesList.length} />
                        <InfoBox className={'w-40 md:h-24'} status={'Moving'} vehicleCount={movingVehiclesList.length} />
                        <InfoBox className={'w-40 md:h-24'} status={'Idle'} vehicleCount={idleVehiclesList.length} />
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
            <div className='w-full h-full px-4 md:py-4 flex flex-col items-start gap-y-4'>
                {
                    vehicles.map((vehicle, index) => {
                        return (
                            <div key={vehicle._id} className='w-full'>
                                <VehiclesListItem className={'w-full h-28'} vehicle={vehicle} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

const VehiclesListItem = ({ className, vehicle }) => {
    const socket = useContext(MyContext);

    function removeVehicle(vehicle) {
        socket.emit('vehicle-remove', vehicle);
    }

    const [formOpen, setFormOpen] = useState(false);

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
            <div className={`w-full h-full bg-slate-100 shadow-md shadow-slate-900/10 rounded-md p-4`}>
                <div className='w-full h-full flex flex-row items-center justify-between md:gap-x-8 gap-x-2'>
                    <div className='h-full aspect-square rounded-md bg-slate-300 relative'>
                        <Image src={vehicle_pic} alt='vehicle pic' loading='lazy' fill />
                    </div>
                    <div className='grow flex flex-col justify-between items-start'>
                        <p className='md:text-base text-sm'>{vehicle.model}</p>
                        <p className='md:text-base text-sm'>{vehicle.id}</p>
                        {/* <Address className={'text-xs'} latlondata={{ lat: vehicle.lat, lon: vehicle.lon }} selected={isSelected} /> */}
                        <div className={`w-16 h-6 rounded-md flex justify-center items-center ${vehicle.status == 'moving' ? 'bg-green-300' : 'bg-red-300'}`}>
                            <p className={`${vehicle.status == 'moving' ? 'text-green-600' : 'text-red-600'} 
                            font-semibold text-sm`}>{vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}</p>
                        </div>
                    </div>
                    <div className={`h-full flex flex-col justify-center items-center gap-y-2 ${formOpen ? 'invisible' : 'visible'}`}>
                        <button className='md:w-24 w-14 py-2 bg-blue-500 hover:bg-blue-600 text-blue-950 rounded-md font-semibold md:text-base text-xs'
                            onClick={() => setFormOpen(true)}>
                            Edit
                        </button>
                        <button className='md:w-24 w-14 py-2 bg-red-500 hover:bg-red-600 text-red-950 rounded-md font-semibold md:text-base text-xs'
                            onClick={() => removeVehicle(vehicle)}>
                            Remove
                        </button>
                    </div>
                        {
                            formOpen &&
                            <EditForm className={'absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10'} vehicle={vehicle} close={() => setFormOpen(false)} />
                        }
                </div>
            </div>
        </div>
    )
}

export default DashboardPage
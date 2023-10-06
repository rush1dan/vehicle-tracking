'use client'

import Image from 'next/image'
import React, { useState, useContext } from 'react'
import { MyContext } from '@/redux/MyContext'
import { useSession } from 'next-auth/react'
import Dropdown from './Dropdown'

const AddForm = ({ className, close }) => {
    const socket = useContext(MyContext);
    const { data: session, status: sessionStatus } = useSession();
    const userId = session?.user?.id;

    const [number_plate, setNumberPlate] = useState('');
    const [model, setModel] = useState('');
    const [status, setStatus] = useState('Idle');
    const [category, setCategory] = useState('Car');
    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);

    function handleSubmit(e) {
        e.preventDefault();
        const newVehicle = {
            'number_plate': number_plate,
            'lat': Number(lat),
            'lon': Number(lon),
            'status': status.toLowerCase(),
            'category': category.toLocaleLowerCase(),
            'model': model
        }
        socket.emit('vehicle-add', userId, newVehicle);
        e.target.reset();   //this is the form
        close();
    }

    return (
        <div className={className}>
            <div className='w-full h-full p-12 bg-slate-50 rounded-lg shadow-lg shadow-slate-800/20 relative'>
                <button className='w-8 h-8 absolute top-8 right-8 translate-x-1/2 -translate-y-1/2' onClick={() => close()}>
                    <Image src='/x.svg' alt='cross' fill />
                </button>
                <form className="w-full h-full flex flex-col items-center justify-start gap-y-4" onSubmit={(e) => handleSubmit(e)}>
                    {/* Id and Model */}
                    <div className='flex flex-row items-center justify-center gap-x-8'>
                        <div className='flex flex-col items-start justify-between'>
                            <label htmlFor='number_plate' className='font-semibold text-gray-500 px-2 py-1'>Number Plate</label>
                            <input type='text' id='number_plate' name='number_plate' className='text-base border border-gray-500 rounded-md w-28 p-2' required
                                onChange={(e) => setNumberPlate(e.target.value)} />
                        </div>
                        <div className='flex flex-col items-start justify-between'>
                            <label htmlFor='model' className='font-semibold text-gray-500 px-2 py-1'>Model</label>
                            <input type='text' id='model' name='model' className='text-base border border-gray-500 rounded-md w-28 p-2' required
                                onChange={(e) => setModel(e.target.value)} />
                        </div>
                    </div>

                    {/* Status and Category */}
                    <div className='flex flex-row items-center justify-center gap-x-8 mt-2'>
                        <Dropdown className={'w-28 h-10'} title={'Status'} forceUseTitle={true} options={['Idle', 'Moving']} defaultOption={'Idle'}
                            setOption={(option) => setStatus(option)} />
                        <Dropdown className={'w-28 h-10'} title={'Category'} forceUseTitle={true} options={['Car', 'Bus', 'Truck']} defaultOption={'Car'}
                            setOption={(option) => setCategory(option)} />
                    </div>

                    {/* Lat and Lon */}
                    <div className='flex flex-row items-center justify-center gap-x-8'>
                        <div className='flex flex-col items-start justify-between'>
                            <label htmlFor='lat' className='font-semibold text-gray-500 px-2 py-1'>Latitude</label>
                            <input type='number' step='any' min={-90} max={90} id='lat' name='lat' className='text-base border border-gray-500 rounded-md w-28 p-2' required
                                onChange={(e) => setLat(e.target.value)} />
                        </div>
                        <div className='flex flex-col items-start justify-between'>
                            <label htmlFor='lon' className='font-semibold text-gray-500 px-2 py-1'>Longitude</label>
                            <input type='number' step='any' min={-180} max={180} id='lon' name='lon' className='text-base border border-gray-500 rounded-md w-28 p-2' required
                                onChange={(e) => setLon(e.target.value)} />
                        </div>
                    </div>
                    <button type='submit' className='mt-8 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg rounded-lg'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddForm
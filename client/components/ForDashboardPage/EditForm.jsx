'use client'

import Image from 'next/image'
import React, { useRef, useState, useContext } from 'react'
import { MyContext } from '@/redux/MyContext'

const EditForm = ({ className, vehicle, close }) => {
    const formRef = useRef(null);

    const socket = useContext(MyContext);

    const [status, setStatus] = useState('idle');
    const [category, setCategory] = useState('car');
    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);

    function handleSubmit(e) {
        e.preventDefault();
        const editedVehicle = {
            'id': vehicle.id,
            'lat': Number(lat),
            'lon': Number(lon),
            'status': status,
            'category': category,
            'model': vehicle.model
        }
        socket.emit('vehicle-update', editedVehicle);
        formRef.current?.reset();
        close();
    }

    return (
        <div className={className}>
            <div className='w-full h-full p-12 bg-slate-50 rounded-lg shadow-lg shadow-slate-800/20 relative'>
                <button className='w-8 h-8 absolute top-8 right-8 translate-x-1/2 -translate-y-1/2' onClick={() => close()}>
                    <Image src='/x.svg' alt='cross' fill />
                </button>
                <form className="w-full h-full flex flex-col items-center justify-start gap-y-4" onSubmit={(e) => handleSubmit(e)} ref={formRef}>
                    <p className='font-semibold text-gray-500'>Editing: <span className='text-black'>{vehicle.id}</span></p>
                    {/* Status and Category */}
                    <div className='flex flex-row items-center justify-center gap-x-8'>
                        <div className='flex flex-col items-start justify-between'>
                            <label htmlFor='id' className='font-semibold text-gray-500 px-2 py-1'>Status</label>
                            <input type='text' id='id' name='id' className='text-base border border-gray-500 rounded-md w-28 p-2' required
                                defaultValue={vehicle.status} onChange={(e) => setStatus(e.target.value.toLowerCase())} />
                        </div>
                        <div className='flex flex-col items-start justify-between'>
                            <label htmlFor='model' className='font-semibold text-gray-500 px-2 py-1'>Category</label>
                            <input type='text' id='model' name='model' className='text-base border border-gray-500 rounded-md w-28 p-2' required
                                defaultValue={vehicle.category} onChange={(e) => setCategory(e.target.value.toLowerCase())} />
                        </div>
                    </div>

                    {/* Lat and Lon */}
                    <div className='flex flex-row items-center justify-center gap-x-8'>
                        <div className='flex flex-col items-start justify-between'>
                            <label htmlFor='lat' className='font-semibold text-gray-500 px-2 py-1'>Latitude</label>
                            <input type='number' step='any' min={-90} max={90} id='lat' name='lat' className='text-base border border-gray-500 rounded-md w-28 p-2' required
                                defaultValue={vehicle.lat.toFixed(4)}
                                onChange={(e) => setLat(e.target.value)} />
                        </div>
                        <div className='flex flex-col items-start justify-between'>
                            <label htmlFor='lon' className='font-semibold text-gray-500 px-2 py-1'>Longitude</label>
                            <input type='number' step='any' min={-180} max={180} id='lon' name='lon' className='text-base border border-gray-500 rounded-md w-28 p-2' required
                                defaultValue={vehicle.lon.toFixed(4)}
                                onChange={(e) => setLon(e.target.value)} />
                        </div>
                    </div>
                    <button type='submit' className='mt-8 px-6 py-3 bg-slate-400 hover:bg-slate-500 text-white font-semibold text-lg rounded-lg'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default EditForm
'use client'

import Image from 'next/image'
import React, { useState, useContext } from 'react'
import { MyContext } from '@/redux/MyContext'
import Dropdown from './Dropdown'

const EditForm = ({ className, vehicle, close }) => {
    const socket = useContext(MyContext);

    const [data, setData] = useState({ ...vehicle });

    function handleSubmit(e) {
        e.preventDefault();
        socket.emit('vehicle-update', data);
        e.target.reset();
        close();
    }

    return (
        <div className={className}>
            <div className='w-full h-full p-12 bg-slate-50 rounded-lg shadow-lg shadow-slate-800/20 relative'>
                <button className='w-8 h-8 absolute top-8 right-8 translate-x-1/2 -translate-y-1/2' onClick={() => close()}>
                    <Image src='/x.svg' alt='cross' fill />
                </button>
                <form className="w-full h-full flex flex-col items-center justify-start gap-y-4" onSubmit={(e) => handleSubmit(e)}>
                    <p className='font-semibold text-gray-500'>Editing: <span className='text-black'>{vehicle.number_plate}</span></p>
                    {/* Status and Category */}
                    <div className='flex flex-row items-center justify-center gap-x-8'>
                        <div className='flex flex-col items-start justify-between'>
                            <label htmlFor='status' className='font-semibold text-gray-500 px-2 py-1'>Status</label>
                            <input type='text' id='status' name='status' className='text-base border border-gray-500 rounded-md w-28 p-2' required
                                defaultValue={vehicle.status} onChange={(e) => setData({...data, status: e.target.value.toLowerCase() })} />
                        </div>
                        <div className='flex flex-col items-start justify-between'>
                            <label htmlFor='category' className='font-semibold text-gray-500 px-2 py-1'>Category</label>
                            <input type='text' id='category' name='category' className='text-base border border-gray-500 rounded-md w-28 p-2' required
                                defaultValue={vehicle.category} onChange={(e) => setData({...data, category: e.target.value.toLowerCase() })} />
                        </div>
                    </div>

                    {/* Status and Category */}
                    <div className='flex flex-row items-center justify-center gap-x-8 mt-2'>
                        <Dropdown className={'w-28 h-10'} title={'Status'} forceUseTitle={false} options={['Idle', 'Moving']} defaultOption={vehicle.status}
                            setOption={(option) => setData({ ...data, status: option.toLowerCase() })} />
                        <Dropdown className={'w-28 h-10'} title={'Category'} forceUseTitle={false} options={['Car', 'Bus', 'Truck']} defaultOption={vehicle.category}
                            setOption={(option) => setData({ ...data, category: option.toLowerCase() })} />
                    </div>

                    {/* Lat and Lon */}
                    <div className='flex flex-row items-center justify-center gap-x-8'>
                        <div className='flex flex-col items-start justify-between'>
                            <label htmlFor='lat' className='font-semibold text-gray-500 px-2 py-1'>Latitude</label>
                            <input type='number' step='any' min={-90} max={90} id='lat' name='lat' className='text-base border border-gray-500 rounded-md w-28 p-2' required
                                defaultValue={vehicle.lat.toFixed(4)}
                                onChange={(e) => setData({...data, lat: Number(e.target.value) })} />
                        </div>
                        <div className='flex flex-col items-start justify-between'>
                            <label htmlFor='lon' className='font-semibold text-gray-500 px-2 py-1'>Longitude</label>
                            <input type='number' step='any' min={-180} max={180} id='lon' name='lon' className='text-base border border-gray-500 rounded-md w-28 p-2' required
                                defaultValue={vehicle.lon.toFixed(4)}
                                onChange={(e) => setData({...data, lon: Number(e.target.value) })} />
                        </div>
                    </div>
                    <button type='submit' className='mt-8 px-6 py-3 bg-slate-400 hover:bg-slate-500 text-white font-semibold text-lg rounded-lg'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default EditForm
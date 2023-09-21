'use client'

import Image from 'next/image'
import React, { useState } from 'react'

const AddForm = ({ className, close }) => {

    const [id, setId] = useState('');
    const [model, setModel] = useState('');
    const [status, setStatus] = useState('');
    const [category, setCategory] = useState('');
    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);

    function handleSubmit(e) {
        e.preventDefault();
        const data = {
            'id': {
                'id': id,
                'lat': lat,
                'lon': lon,
                'status': status,
                'category': category,
                'model': model
            }
        }
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
                            <label htmlFor='id' className='font-semibold text-gray-500 px-2 py-1'>Id</label>
                            <input type='text' id='id' name='id' className='text-base border border-gray-500 rounded-md w-28 p-2' required
                                onChange={(e) => setId(e.target.value)}/>
                        </div>
                        <div className='flex flex-col items-start justify-between'>
                            <label htmlFor='model' className='font-semibold text-gray-500 px-2 py-1'>Model</label>
                            <input type='text' id='model' name='model' className='text-base border border-gray-500 rounded-md w-28 p-2' required
                                onChange={(e) => setModel(e.target.value)}/>
                        </div>
                    </div>

                    {/* Status and Category */}
                    <div className='flex flex-row items-center justify-center gap-x-8'>
                        <div className='flex flex-col items-start justify-between'>
                            <label htmlFor='id' className='font-semibold text-gray-500 px-2 py-1'>Status</label>
                            <input type='text' id='id' name='id' className='text-base border border-gray-500 rounded-md w-28 p-2' required
                                value={'Idle'} onChange={(e) => setStatus(e.target.value)}/>
                        </div>
                        <div className='flex flex-col items-start justify-between'>
                            <label htmlFor='model' className='font-semibold text-gray-500 px-2 py-1'>Category</label>
                            <input type='text' id='model' name='model' className='text-base border border-gray-500 rounded-md w-28 p-2' required
                                value={'Car'} onChange={(e) => setCategory(e.target.value)}/>
                        </div>
                    </div>

                    {/* Lat and Lon */}
                    <div className='flex flex-row items-center justify-center gap-x-8'>
                        <div className='flex flex-col items-start justify-between'>
                            <label htmlFor='lat' className='font-semibold text-gray-500 px-2 py-1'>Latitude</label>
                            <input type='number' min={-90} max={90} id='lat' name='lat' className='text-base border border-gray-500 rounded-md w-28 p-2' required
                                onChange={(e) => setLat(e.target.value)}/>
                        </div>
                        <div className='flex flex-col items-start justify-between'>
                            <label htmlFor='lon' className='font-semibold text-gray-500 px-2 py-1'>Longitude</label>
                            <input type='number' min={-180} max={180} id='lon' name='lon' className='text-base border border-gray-500 rounded-md w-28 p-2' required
                                onChange={(e) => setLon(e.target.value)}/>
                        </div>
                    </div>
                    <button type='submit' className='mt-8 px-6 py-3 bg-slate-400 hover:bg-slate-500 text-white font-semibold text-lg rounded-lg'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddForm
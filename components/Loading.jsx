import Image from 'next/image'
import React from 'react'

const Loading = ({className}) => {
    return (
        <div className={className}>
            <div className='w-full h-full relative flex flex-row items-center justify-center'>
                <div className='flex flex-row items-center justify-center gap-x-3'>
                    <div className='w-8 h-8 relative'>
                        <Image src='/loading.gif' alt='loading icon' fill />
                    </div>
                    <p className='text-inherit font-semibold text-xl'>Loading...</p>
                </div>
            </div>
        </div>
    )
}

export default Loading
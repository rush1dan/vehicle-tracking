import Image from 'next/image'
import React from 'react'

const Topbar = (props) => {
    return (
        <div className={props.className}>
            <div className='w-full h-full bg-blue-600 relative'>
                <div className='w-24 h-20 absolute top-1/2 left-16 -translate-y-1/2'>
                    <Image src='/tracky.png' alt='logo' loading='eager' fill objectFit='contain' />
                </div>
            </div>
        </div>
    )
}

export default Topbar
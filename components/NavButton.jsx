'use client'

import Image from 'next/image'
import React from 'react'

const NavButton = ({classname, title, iconSrc}) => {
    return (
        <div className={classname}>
            <div className='w-full h-full flex flex-col items-center justify-center gap-y-4 cursor-pointer hover:bg-blue-900/50'>
                <div className='w-8 h-8 relative'>
                    <Image src={iconSrc} alt={''} fill loading='eager' />
                </div>
                <p className='font-semibold text-lg text-white'>{title}</p>
            </div>
        </div>
    )
}

export default NavButton
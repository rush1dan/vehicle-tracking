'use client'

import React from 'react'
import NavButton from './NavButton'
import { useSelector } from 'react-redux'

const Sidebar = ({ className }) => {
    const shouldSideBarOpen = useSelector((state) => state.sideBarOpen).value;

    return (
        <div className={`${className} md:block md:relative absolute left-0 ${shouldSideBarOpen ? '' : 'hidden'}`}>
            <div className='w-full h-full flex flex-col items-center justify-start bg-blue-600'>
                <div className='w-full h-4'></div>
                <NavButton classname={'w-full h-32'} title={'Dashboard'} iconSrc={'/dashboard.svg'} />
                <NavButton classname={'w-full h-32'} title={'Live'} iconSrc={'/locate.svg'} />
                <NavButton classname={'w-full h-32'} title={'Settings'} iconSrc={'/settings.svg'} />
            </div>
        </div>
    )
}

export default Sidebar
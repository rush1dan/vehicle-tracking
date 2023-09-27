'use client'

import Image from 'next/image'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectPage } from '@/redux/selectedPageSlice'

const NavButton = ({ classname, title, iconSrc }) => {
    const selectedPage = useSelector((state) => state.selectedPage);
    const dispatch = useDispatch();
    return (
        <div className={classname}>
            <div className={`w-full h-full flex flex-col items-center justify-center gap-y-4 cursor-pointer hover:bg-blue-900/50 relative
                ${selectedPage.value === title ? 'bg-blue-900/50' : ''}`}
                onClick={() => dispatch(selectPage(title))}>
                <div className='w-8 h-8 relative'>
                    <Image src={iconSrc} alt={''} fill loading='eager' />
                </div>
                <p className='font-semibold text-lg text-white'>{title}</p>
                {
                    selectedPage.value === title &&
                    <div className='absolute h-full w-[0.3rem] bg-orange-400 left-0' />
                }
            </div>
        </div>
    )
}

export default NavButton
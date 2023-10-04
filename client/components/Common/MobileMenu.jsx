'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useDispatch } from 'react-redux';
import { sideBarOpen, sideBarClose } from '@/redux/sideBarOpenSlice';

const MobileMenu = ({ className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    function handleClick() {
        setIsOpen(!isOpen);
        dispatch(isOpen ? sideBarClose() : sideBarOpen());
    }

    return (
        <button className={className} onClick={() => handleClick()}>
            <Image src={isOpen ? '/back.svg': '/menu.svg'} alt='menu' loading='eager' fill />
        </button>
    )
}

export default MobileMenu
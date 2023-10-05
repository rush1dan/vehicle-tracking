import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileMenu from './MobileMenu'
import Account from '../ForAuth/Account'

const Topbar = ({ className }) => {
    return (
        <div className={className}>
            <div className='w-full h-full bg-blue-600 relative'>
                <Link href='/' className='w-24 h-20 absolute top-1/2 left-16 -translate-y-1/2'>
                    <Image src='/tracky.png' alt='logo' loading='eager' fill objectFit='contain' />
                </Link>
                <MobileMenu className='w-10 h-10 absolute top-1/2 -translate-y-1/2 left-2 md:hidden' />
                <Account className={'absolute top-1/2 -translate-y-1/2 md:right-16 right-4'} />
            </div>
        </div>
    )
}

export default Topbar
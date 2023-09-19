import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Topbar = ({ className }) => {
    return (
        <div className={className}>
            <div className='w-full h-full bg-blue-600 relative'>
                <Link href='/' className='w-24 h-20 absolute top-1/2 left-16 -translate-y-1/2'>
                    <Image src='/tracky.png' alt='logo' loading='eager' fill objectFit='contain' />
                </Link>
            </div>
        </div>
    )
}

export default Topbar
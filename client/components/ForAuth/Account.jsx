'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useState } from 'react'
import SignOutModal from './SignOutModal'

const Account = ({className}) => {
    const { data: session, status } = useSession();

    const [showSignOutModal, setShowSignOutModal] = useState(false);

    if (status !== 'authenticated') {
        return null;
    }
    return (
        <div className={className}>
            <div className='w-full h-full'>
                <div className='w-full h-full flex flex-row items-center justify-center gap-x-2 rounded-full p-2 bg-blue-300/50 hover:bg-white/50 border-2 border-white
                cursor-pointer' onClick={e => setShowSignOutModal(!showSignOutModal)}>
                    <div className='w-6 h-6 rounded-full relative'>
                        <Image src='/user.svg' alt='profile' fill />
                    </div>
                    <p className='text-white font-semibold text-sm'>{session.user.username}</p>
                </div>
                {
                    showSignOutModal &&
                    <SignOutModal className={'absolute top-full right-0 mt-4 z-[2000]'} />
                }
            </div>
        </div>
    )
}

export default Account
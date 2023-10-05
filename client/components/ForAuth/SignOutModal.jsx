import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React from 'react'

const SignOutModal = ({ className }) => {
    const router = useRouter();
    async function handleSignOut() {
        await signOut({ redirect: false });
        router.push('/signin');
    }
    return (
        <div className={className}>
            <div className='flex flex-col items-center justify-center p-12 bg-neutral-100 shadow-slate-700/10 shadow-lg rounded-lg'>
                <button className='bg-orange-500 rounded-md w-32 h-12 hover:bg-orange-600' onClick={e => handleSignOut()}>
                    <span className='text-white text-xl font-semibold text'>Sign Out</span>
                </button>
            </div>
        </div>
    )
}

export default SignOutModal
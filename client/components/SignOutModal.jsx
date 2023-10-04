import React from 'react'

const SignOutModal = ({className}) => {
    return (
        <div className={className}>
            <div className='flex flex-col items-center justify-center p-12 bg-sky-100 shadow-slate-700/10 shadow-lg rounded-lg'>
                <button className='bg-purple-500 rounded-md w-32 h-12 hover:bg-purple-200'>
                    <span className='text-white text-xl font-semibold text'>Sign Out</span>
                </button>
            </div>
        </div>
    )
}

export default SignOutModal
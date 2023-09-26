import React from 'react'

const LoadingDisclaimer = ({ className }) => {
    return (
        <div className={className}>
            <p className='text-lg italic font-semibold text-gray-400 text-center'>
                The api backend is hosted on render.com, where the machines in the free tier spin down after a duration of inactivity.
                So, there may be an initial loading time of up to about <span className='text-xl font-bold text-gray-500'>60s</span> when first making the api request.
                Subseqent requests are faster.
            </p>
        </div>
    )
}

export default LoadingDisclaimer
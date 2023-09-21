import React from 'react'
import dynamic from "next/dynamic";
import LiveFeedSection from '@/components/LiveFeedSection';

const LeafletMap = dynamic(() => import("@/components/LeafletMap"), { ssr: false });

const LivePage = () => {
    return (
        <div className='w-full h-full'>
            <div className='w-full h-full flex md:flex-row md:items-start justify-start flex-col-reverse items-center'>
                <LiveFeedSection className={'md:w-[28rem] md:h-full w-full h-1/2'} />
                <LeafletMap className={'md:w-[calc(100%-28rem)] md:h-full w-full h-1/2'} />
            </div>
        </div>
    )
}

export default LivePage
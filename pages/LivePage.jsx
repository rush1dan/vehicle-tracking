import React from 'react'
import dynamic from "next/dynamic";
import LiveFeed from '@/components/LiveFeed';

const LeafletMap = dynamic(() => import("@/components/LeafletMap"), { ssr: false });

const LivePage = () => {
    return (
        <div className='w-full h-full'>
            <div className='w-full h-full flex flex-row items-start justify-start'>
                <LiveFeed className={'w-[28rem] h-full'} />
                <LeafletMap className={'w-[calc(100%-28rem)] h-full'} />
            </div>
        </div>
    )
}

export default LivePage
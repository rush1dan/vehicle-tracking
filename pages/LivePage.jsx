import React from 'react'
import dynamic from "next/dynamic";
import LiveFeedSection from '@/components/LiveFeedSection';

const LeafletMap = dynamic(() => import("@/components/LeafletMap"), { ssr: false });

const LivePage = () => {
    return (
        <div className='w-full h-full'>
            <div className='w-full h-full flex md:flex-row md:items-start justify-start flex-col-reverse items-center'>
                <LiveFeedSection className={'lg:w-[28rem] md:w-[24rem] md:h-full w-full h-1/2'} />
                <LeafletMap className={'lg:w-[calc(100%-28rem)] md:w-[calc(100%-24rem)] md:h-full w-full h-1/2'} />
            </div>
        </div>
    )
}

export default LivePage
import React from 'react'
import vehicle_data from '@/demo/vehicles'
import LiveFeedCard from './LiveFeedCard'

const LiveFeed = (props) => {
    return (
        <div className={props.className}>
            <div className='w-full h-full p-4 flex flex-col items-start gap-y-4 bg-slate-200 overflow-y-auto'>
                {
                    vehicle_data.map((data, index) => {
                        return (
                            <div key={data.id} className='w-full'>
                                <LiveFeedCard index={index} className={'w-full h-20'} data={data} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default LiveFeed
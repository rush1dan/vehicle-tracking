import React from 'react'
import LiveFeed from './LiveFeed'


const LiveFeedSection = (props) => {
    return (
        <div className={props.className}>
            <div className='w-full h-full bg-slate-200'>
                <LiveFeed className='w-full h-full' />
            </div>
        </div>
    )
}



export default LiveFeedSection
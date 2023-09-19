import React from 'react'
import NavButton from './NavButton'

const Sidebar = (props) => {
    return (
        <div className={props.className}>
            <div className='w-full h-full flex flex-col items-center justify-start bg-blue-700'>
                <NavButton classname={'w-full h-32'} title={'Dashboard'} iconSrc={'/dashboard.svg'} />
                <NavButton classname={'w-full h-32'} title={'Live'} iconSrc={'/locate.svg'} />
                <NavButton classname={'w-full h-32'} title={'Settings'} iconSrc={'/settings.svg'} />
            </div>
        </div>
    )
}

export default Sidebar
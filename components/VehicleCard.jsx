import React from 'react'

const VehicleCard = ({className, vehicle}) => {
    return (
        <div className={className}>
            <div className='w-full h-full'>
                {vehicle.id}
            </div>
        </div>
    )
}

export default VehicleCard
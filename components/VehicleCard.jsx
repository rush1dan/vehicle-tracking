import React from 'react'

const VehicleCard = ({className, vehicle_data}) => {
    return (
        <div className={className}>
            <div className='w-full h-full'>
                {vehicle_data.id}
            </div>
        </div>
    )
}

export default VehicleCard
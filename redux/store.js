import { configureStore } from '@reduxjs/toolkit'
import selectedVehicleReducer from './selectedVehicleSlice'

export const store = configureStore({
    reducer: {
        selectedVehicle: selectedVehicleReducer,
    },
})
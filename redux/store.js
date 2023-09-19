import { configureStore } from '@reduxjs/toolkit'
import selectedVehicleReducer from './selectedVehicleSlice'
import selectedTabReducer from './selectedTabSlice'

export const store = configureStore({
    reducer: {
        selectedVehicle: selectedVehicleReducer,
        selectedTab: selectedTabReducer,
    },
})
import { configureStore } from '@reduxjs/toolkit'
import selectedVehicleReducer from './selectedVehicleSlice'
import selectedTabReducer from './selectedTabSlice'
import selectedPageReducer from './selectedPageSlice'
import allVehiclesReducer from './allVehiclesSlice'
import socketReducer from './socketSlice'

export const store = configureStore({
    reducer: {
        selectedVehicle: selectedVehicleReducer,
        selectedTab: selectedTabReducer,
        selectedPage: selectedPageReducer,
        allVehicles: allVehiclesReducer,
        socket: socketReducer,
    },
})
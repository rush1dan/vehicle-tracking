import { configureStore } from '@reduxjs/toolkit'
import selectedVehicleReducer from './selectedVehicleSlice'
import selectedTabReducer from './selectedTabSlice'
import selectedPageReducer from './selectedPageSlice'

export const store = configureStore({
    reducer: {
        selectedVehicle: selectedVehicleReducer,
        selectedTab: selectedTabReducer,
        selectedPage: selectedPageReducer,
    },
})
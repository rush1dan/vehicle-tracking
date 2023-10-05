import { configureStore } from '@reduxjs/toolkit'
import selectedVehicleReducer from './selectedVehicleSlice'
import selectedTabReducer from './selectedTabSlice'
import selectedPageReducer from './selectedPageSlice'
import allVehiclesReducer from './allVehiclesSlice'
import sideBarOpenReducer from './sideBarOpenSlice'
import connectionReducer from './connectionSlice'

export const store = configureStore({
    reducer: {
        selectedVehicle: selectedVehicleReducer,
        selectedTab: selectedTabReducer,
        selectedPage: selectedPageReducer,
        allVehicles: allVehiclesReducer,
        sideBarOpen: sideBarOpenReducer,
        connected: connectionReducer,
    },
})
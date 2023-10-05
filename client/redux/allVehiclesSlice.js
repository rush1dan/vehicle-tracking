import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    vehicle_data: {}
};

export const allVehiclesSlice = createSlice({
	name: 'allVehicles',
	initialState,
    reducers: {
        setVehicles: (state, action) => {
            state.vehicle_data = action.payload;
        },
		updateVehicle: (state, action) => {
            state.vehicle_data[action.payload._id] = action.payload;
        },
        addVehicle: (state, action) => {
            state.vehicle_data[action.payload._id] = action.payload;
        },
        removeVehicle: (state, action) => {
            delete state.vehicle_data[action.payload._id];
        }
	},
})

// Action creators are generated for each case reducer function
export const { setVehicles, updateVehicle, addVehicle, removeVehicle } = allVehiclesSlice.actions

export default allVehiclesSlice.reducer
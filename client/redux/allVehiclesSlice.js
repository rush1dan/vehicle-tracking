import { createSlice } from '@reduxjs/toolkit'

const initialState = {};

export const allVehiclesSlice = createSlice({
	name: 'allVehicles',
	initialState,
    reducers: {
        setVehicles: (state, action) => {
            Object.assign(state, action.payload);
        },
		updateVehicle: (state, action) => {
            state[action.payload.id] = action.payload;
        },
        addVehicle: (state, action) => {
            state[action.payload.id] = action.payload;
        },
        removeVehicle: (state, action) => {
            delete state[action.payload.id];
        }
	},
})

// Action creators are generated for each case reducer function
export const { setVehicles, updateVehicle, addVehicle, removeVehicle } = allVehiclesSlice.actions

export default allVehiclesSlice.reducer
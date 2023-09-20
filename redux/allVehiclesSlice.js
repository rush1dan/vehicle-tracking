import { createSlice } from '@reduxjs/toolkit'

const initialState = [];

export const allVehiclesSlice = createSlice({
	name: 'allVehicles',
	initialState,
    reducers: {
        setVehicles: (state, action) => {
            Object.assign(state, action.payload);
        },
		updateVehicle: (state, action) => {
            state[action.payload.index] = action.payload.data;
		},
	},
})

// Action creators are generated for each case reducer function
export const { setVehicles, updateVehicle } = allVehiclesSlice.actions

export default allVehiclesSlice.reducer
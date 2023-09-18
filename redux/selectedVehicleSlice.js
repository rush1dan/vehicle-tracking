import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	index: -1,
	id: null
}

export const selectedVehicleSlice = createSlice({
	name: 'selectedVehicle',
	initialState,
	reducers: {
		selectVehicle: (state, action) => {
			state.index = action.payload.index;
			state.id = action.payload.id;
		},
	},
})

// Action creators are generated for each case reducer function
export const { selectVehicle } = selectedVehicleSlice.actions

export default selectedVehicleSlice.reducer
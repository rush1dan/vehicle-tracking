import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	id: null
}

export const selectedVehicleSlice = createSlice({
	name: 'selectedVehicle',
	initialState,
	reducers: {
		selectVehicle: (state, action) => {
			state.id = action.payload;
		},
	},
})

// Action creators are generated for each case reducer function
export const { selectVehicle } = selectedVehicleSlice.actions

export default selectedVehicleSlice.reducer
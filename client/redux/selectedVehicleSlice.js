import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	_id: null
}

export const selectedVehicleSlice = createSlice({
	name: 'selectedVehicle',
	initialState,
	reducers: {
		selectVehicle: (state, action) => {
			state._id = action.payload;
		},
	},
})

// Action creators are generated for each case reducer function
export const { selectVehicle } = selectedVehicleSlice.actions

export default selectedVehicleSlice.reducer
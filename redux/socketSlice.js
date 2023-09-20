import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: null
}

export const socketSlice = createSlice({
	name: 'socket',
	initialState,
	reducers: {
		setSocket: (state, action) => {
			state.value = action.payload
		},
	},
})

// Action creators are generated for each case reducer function
export const { setSocket } = socketSlice.actions

export default socketSlice.reducer
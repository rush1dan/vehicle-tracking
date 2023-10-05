import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	value: false
}

export const connectionSlice = createSlice({
	name: 'connected',
	initialState,
	reducers: {
		connect: (state) => {
            state.value = true;
        },
        disconnect: (state) => {
            state.value = false;
        }
	},
})

// Action creators are generated for each case reducer function
export const { connect, disconnect } = connectionSlice.actions

export default connectionSlice.reducer
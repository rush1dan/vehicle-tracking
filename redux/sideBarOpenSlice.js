import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	value: false
}

export const sideBarOpenSlice = createSlice({
	name: 'sideBarOpen',
	initialState,
	reducers: {
		sideBarOpen: (state) => {
            state.value = true;
        },
        sideBarClose: (state) => {
            state.value = false;
        }
	},
})

// Action creators are generated for each case reducer function
export const { sideBarOpen, sideBarClose } = sideBarOpenSlice.actions

export default sideBarOpenSlice.reducer
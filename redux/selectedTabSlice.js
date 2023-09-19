import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 'All Vehicles'
}

export const selectedTabSlice = createSlice({
    name: 'selectedTab',
    initialState,
    reducers: {
        selectTab: (state, action) => {
            state.value = action.payload;
        },
    },
})

export const { selectTab } = selectedTabSlice.actions

export default selectedTabSlice.reducer
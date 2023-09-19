import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 'Dashboard'
}

export const selectedPageSlice = createSlice({
    name: 'selectedPage',
    initialState,
    reducers: {
        selectPage: (state, action) => {
            state.value = action.payload;
        },
    },
})

export const { selectPage } = selectedPageSlice.actions

export default selectedPageSlice.reducer
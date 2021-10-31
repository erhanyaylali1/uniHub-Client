import { createSlice } from '@reduxjs/toolkit';

export const generalSlice = createSlice({
    name: 'general',
    initialState: {
        screenSize: null,
    },
    reducers: {
        setScreenSize: (state, action) => {
            state.screenSize = action.payload;
        }
    },
});

export const { setScreenSize } = generalSlice.actions;
export const getScreenSize = (state) => state.general.screenSize;
export default generalSlice.reducer;
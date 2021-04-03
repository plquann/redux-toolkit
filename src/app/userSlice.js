import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from 'api/userApi';

//async action with redux toolkit
export const getMe = createAsyncThunk('user/getMe', async (params, thunkAPI) => {
    //thunkAPI.dispatch...
    const currentUser = await userApi.getMe();
    return currentUser;
})
const userSlice = createSlice({
    name: 'user',
    initialState: {
        current: {},
        // loading: false,
        // error: '',
    },

    reducers: {},
    //handle state of async action
    // extraReducers: {
    //     [getMe.pending]: (state) => {
    //         state.loading = true;
    //     },
    //     [getMe.reject]: (state, action) => {
    //         state.loading = false;
    //         state.error = action.error;
    //     },
    //     [getMe.fulfilled]: (state, action) => {
    //         state.loading = false;
    //         state.current = action.payload;
    //     },
    // },

    //make it easy if it is unnecessary
    extraReducers: {
        [getMe.fulfilled]: (state, action) => {
            state.current = action.payload;
        },
    },
});

const { reducer: userReducer } = userSlice;
export default userReducer;
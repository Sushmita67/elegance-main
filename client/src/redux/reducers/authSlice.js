import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ firstname, lastname, email, password, username }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            await axios.post('/api/users', { firstname, lastname, email, password, username }, config);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            let res = await axios.post('/api/auth', { email, password }, config);
            let data = res.data;

            console.log('Login Response::::', data);

            localStorage.setItem('userToken', data.token);
            localStorage.setItem('userInfo', JSON.stringify(data.user));
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getUserDetails = createAsyncThunk(
    'user/getUserDetails',
    async (arg, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();

            const config = {
                headers: {
                    'x-auth-token': auth.userToken,
                },
            };
            const { data } = await axios.get('/api/auth/verify', config);
            console.log('What Data:::', data);
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateUser = createAsyncThunk(
    'auth/updateUser',
    async (userData, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();

            const config = {
                headers: {
                    'x-auth-token': auth.userToken,
                },
            };

            let res = await axios.put(`/api/auth/${auth.userInfo._id}`, userData, config);
            let data = res.data;
            localStorage.setItem('userInfo', JSON.stringify(data)); // Update userInfo in localStorage
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

// Load userToken and userInfo from local storage safely
const userToken = localStorage.getItem('userToken') || null;
let userInfo = null;

try {
    const storedUserInfo = localStorage.getItem('userInfo');
    userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
} catch (error) {
    console.error("Error parsing userInfo from localStorage:", error);
    localStorage.removeItem('userInfo'); // Remove corrupted data
}

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        error: false,
        loading: false,
        userInfo, // Load from localStorage
        userToken,
        success: false,
        errMsg: '',
        userErrorMsg: '',
        userUpdateError: false,
        userUpdateErrorMsg: '',
        editable: false,
        updating: false,
    },
    reducers: {
        removeError: (state) => {
            state.error = false;
        },
        enableUpdate: (state) => {
            state.editable = !state.editable;
        },
        cancelUpdate: (state) => {
            state.editable = false;
        },
        logout: (state) => {
            localStorage.removeItem('userToken');
            localStorage.removeItem('userInfo');
            state.loading = false;
            state.userInfo = null;
            state.userToken = null;
            state.error = null;
        },
        setCredentials: (state, action) => {
            state.userToken = action.payload.token;
            state.userInfo = action.payload.user;
            localStorage.setItem('userToken', action.payload.token);
            localStorage.setItem('userInfo', JSON.stringify(action.payload.user));
        },
    },
    extraReducers: {
        [registerUser.pending]: (state) => {
            state.loading = true;
            state.error = false;
        },
        [registerUser.fulfilled]: (state) => {
            state.loading = false;
            state.success = true;
        },
        [registerUser.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = true;
            state.errMsg = payload.msg ? payload.msg : payload;
        },
        [loginUser.pending]: (state) => {
            state.loading = true;
            state.error = false;
        },
        [loginUser.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.userInfo = payload.user;
            state.userToken = payload.token;
            state.errMsg = '';
        },
        [loginUser.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = true;
            state.errMsg = payload.msg ? payload.msg : payload;
        },
        [getUserDetails.pending]: (state) => {
            state.loading = true;
            state.error = false;
        },
        [getUserDetails.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.userInfo = payload;
            state.userErrorMsg = '';
        },
        [getUserDetails.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = true;
            state.userErrorMsg = payload.msg ? payload.msg : payload;
        },
        [updateUser.pending]: (state) => {
            state.updating = true;
            state.userUpdateError = false;
        },
        [updateUser.fulfilled]: (state, { payload }) => {
            state.updating = false;
            state.userInfo = payload;
            state.userUpdateErrorMsg = '';
            state.editable = false;
        },
        [updateUser.rejected]: (state, { payload }) => {
            state.updating = false;
            state.userUpdateError = true;
            state.userUpdateErrorMsg = payload.msg ? payload.msg : payload;
            state.editable = false;
        },
    },
});

export const { removeError, enableUpdate, cancelUpdate, logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;

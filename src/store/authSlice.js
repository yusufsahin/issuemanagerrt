import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../api/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Async thunk for logging in
export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/auth/login', credentials);
      const token = response.data.token;
      await AsyncStorage.setItem('@jwt_token', token);
      return token;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  });

// Async thunk for retrieving token
export const getToken = createAsyncThunk('auth/getToken', async (_, thunkAPI) => {
    try {
      const token = await AsyncStorage.getItem('@jwt_token');
      return token;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  });

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    status: 'idle',
    error: null
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      AsyncStorage.removeItem('@jwt_token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getToken.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(getToken.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

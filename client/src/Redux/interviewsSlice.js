// frontend/src/store/interviewSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
    interviews: [],
    loading: false,
    error: null,
};

// Async thunk for fetching interviews
export const fetchInterviews = createAsyncThunk('interviews/fetchInterviews', async () => {

    const response = await axios.get('http://localhost:5000/api/interviews/');
    return response.data;
});

// Async thunk for adding an interview
export const addInterview = createAsyncThunk('interviews/addInterview', async (interview) => {

    const response = await axios.post('http://localhost:5000/api/interviews/create', interview);
    return response.data;
});

// Async thunk for updating an interview
export const updateInterview = createAsyncThunk('interviews/updateInterview', async ({ id, updatedInterview }) => {

    const response = await axios.put(`http://localhost:5000/api/interviews/${id}`, updatedInterview);
    return response.data;
});

// Async thunk for deleting an interview
export const deleteInterview = createAsyncThunk('interviews/deleteInterview', async (id) => {
    
    await axios.delete(`http://localhost:5000/api/interviews/${id}`);
    return id; // Return the id of the deleted interview
});

// Create a slice of the state
const interviewSlice = createSlice({
    name: 'interviews',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchInterviews.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchInterviews.fulfilled, (state, action) => {
                state.loading = false;
                state.interviews = action.payload;
            })
            .addCase(fetchInterviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addInterview.fulfilled, (state, action) => {
                state.interviews.push(action.payload);
            })
            .addCase(updateInterview.fulfilled, (state, action) => {
                const index = state.interviews.findIndex(interview => interview._id === action.payload._id);
                if (index !== -1) {
                    state.interviews[index] = action.payload;
                }
            })
            .addCase(deleteInterview.fulfilled, (state, action) => {
                state.interviews = state.interviews.filter(interview => interview._id !== action.payload);
            });
    },
});

// Export the actions and reducer
export default interviewSlice.reducer;
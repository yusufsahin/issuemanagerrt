import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../api/axios";

// Async thunks
export const fetchIssues = createAsyncThunk('issues/fetchIssues', async (projectId) => {
    const response = await axios.get(`/issues?projectId=${projectId}`);
    return response.data;
});

export const addIssue = createAsyncThunk('issues/addIssue', async (issue) => {
    const response = await axios.post('/issues', issue);
    return response.data;
});

export const updateIssue = createAsyncThunk('issues/updateIssue', async (issue) => {
    const response = await axios.put(`/issues/${issue.id}`, issue);
    return response.data;
});

export const deleteIssue = createAsyncThunk('issues/deleteIssue', async (id) => {
    await axios.delete(`/issues/${id}`);
    return id;
});

// Slice
const issueSlice = createSlice({
    name: 'issues',
    initialState: {
        issues: [],
        status: 'idle',
        error: null,
        addStatus: 'idle',
        updateStatus: 'idle',
        deleteStatus: 'idle',
        currentIssue: null,
    },
    reducers: {
        setCurrentIssue: (state, action) => {
            state.currentIssue = action.payload;
        },
        clearCurrentIssue: (state) => {
            state.currentIssue = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch issues
            .addCase(fetchIssues.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchIssues.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.issues = action.payload;
            })
            .addCase(fetchIssues.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Add issue
            .addCase(addIssue.pending, (state) => {
                state.addStatus = 'loading';
            })
            .addCase(addIssue.fulfilled, (state, action) => {
                state.addStatus = 'succeeded';
                state.issues.push(action.payload);
            })
            .addCase(addIssue.rejected, (state, action) => {
                state.addStatus = 'failed';
                state.error = action.error.message;
            })

            // Update issue
            .addCase(updateIssue.pending, (state) => {
                state.updateStatus = 'loading';
            })
            .addCase(updateIssue.fulfilled, (state, action) => {
                state.updateStatus = 'succeeded';
                const index = state.issues.findIndex(issue => issue.id === action.payload.id);
                if (index !== -1) {
                    state.issues[index] = action.payload;
                }
            })
            .addCase(updateIssue.rejected, (state, action) => {
                state.updateStatus = 'failed';
                state.error = action.error.message;
            })

            // Delete issue
            .addCase(deleteIssue.pending, (state) => {
                state.deleteStatus = 'loading';
            })
            .addCase(deleteIssue.fulfilled, (state, action) => {
                state.deleteStatus = 'succeeded';
                state.issues = state.issues.filter(issue => issue.id !== action.payload);
            })
            .addCase(deleteIssue.rejected, (state, action) => {
                state.deleteStatus = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { setCurrentIssue, clearCurrentIssue } = issueSlice.actions;

export default issueSlice.reducer;

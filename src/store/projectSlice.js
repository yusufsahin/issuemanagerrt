import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../api/axios";

// Async thunks
export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
    const response = await axios.get('/projects');
    return response.data;
});

export const addProject = createAsyncThunk('projects/addProject', async (project) => {
    const response = await axios.post('/projects', project);
    return response.data;
});

export const updateProject = createAsyncThunk('projects/updateProject', async (project) => {
    const response = await axios.put(`/projects/${project.id}`, project);
    return response.data;
});

export const deleteProject = createAsyncThunk('projects/deleteProject', async (id) => {
    await axios.delete(`/projects/${id}`);
    return id;
});

// Slice
const projectSlice = createSlice({
    name: 'projects',
    initialState: {
        projects: [],
        status: 'idle',
        error: null,
        addStatus: 'idle',
        updateStatus: 'idle',
        deleteStatus: 'idle',
        currentProject: null,
    },
    reducers: {
        setCurrentProject: (state, action) => {
            state.currentProject = action.payload;
        },
        clearCurrentProject: (state) => {
            state.currentProject = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch projects
            .addCase(fetchProjects.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.projects = action.payload;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Add project
            .addCase(addProject.pending, (state) => {
                state.addStatus = 'loading';
            })
            .addCase(addProject.fulfilled, (state, action) => {
                state.addStatus = 'succeeded';
                state.projects.push(action.payload);
            })
            .addCase(addProject.rejected, (state, action) => {
                state.addStatus = 'failed';
                state.error = action.error.message;
            })

            // Update project
            .addCase(updateProject.pending, (state) => {
                state.updateStatus = 'loading';
            })
            .addCase(updateProject.fulfilled, (state, action) => {
                state.updateStatus = 'succeeded';
                const index = state.projects.findIndex(project => project.id === action.payload.id);
                if (index !== -1) {
                    state.projects[index] = action.payload;
                }
            })
            .addCase(updateProject.rejected, (state, action) => {
                state.updateStatus = 'failed';
                state.error = action.error.message;
            })

            // Delete project
            .addCase(deleteProject.pending, (state) => {
                state.deleteStatus = 'loading';
            })
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.deleteStatus = 'succeeded';
                state.projects = state.projects.filter(project => project.id !== action.payload);
            })
            .addCase(deleteProject.rejected, (state, action) => {
                state.deleteStatus = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { setCurrentProject, clearCurrentProject } = projectSlice.actions;

export default projectSlice.reducer;


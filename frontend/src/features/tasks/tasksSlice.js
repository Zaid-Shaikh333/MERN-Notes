import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import tasksService from './tasksService';

const initialState = {
    tasks : [],
    isError : false,
    isSuccess : false,
    isLoading : false,
    message : ''
}

export const createTask = createAsyncThunk(
    'tasks/create', async ( taskData, thunkAPI) => {
        try{
            const token = thunkAPI.getState().auth.user.token
            return await tasksService.createTask(taskData, token)
        }
        catch(error){
            const message = (error.response && error.response.data.message && error.response.data)
                || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getTask = createAsyncThunk(
    'tasks/getAll', async (_, thunkAPI) => {
        try{
            const token = thunkAPI.getState().auth.user.token
            return await tasksService.getTask(token)
        }
        catch(error)
        {
                const message = (error.response && error.response.data.message && error.response.data)
                    || error.message || error.toString()
    
                return thunkAPI.rejectWithValue(message)
        }
    }
)

export const tasksSlice = createSlice({
    name : 'tasks',
    initialState,
    reducers : {
        reset : (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(createTask.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createTask.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.tasks.push(action.payload)
        })
        .addCase(createTask.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getTask.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getTask.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.tasks = action.payload
        })
        .addCase(getTask.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const { reset } = tasksSlice.actions
export default tasksSlice.reducer
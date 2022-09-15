import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api';

// Constants
const STREAMS = {
    BASE: 'BASE',
    FRAMEWORK: 'FRAMEWORK',
    ALGORITHMS: 'ALGORITHMS',
    ARCHITECTURE: 'ARCHITECTURE'
};
const ACTIVITIES = {
    THEORY: 'THEORY',
    PRACTICE: 'PRACTICE'
};

// Types
type streamTypes =  keyof typeof STREAMS;
type activityTypes = keyof typeof ACTIVITIES; 
type exerciseType = {
    id: number,
    creationTimeStamp: number,
    stream: streamTypes,
    duration: number,
    activity: activityTypes
}
type stateType = { data: exerciseType[] }

// async actions
const getAllExercises = createAsyncThunk<exerciseType[]>('exercises/getAllExercises', async () => {
    return await api.getExercises();
})
const saveExercise = createAsyncThunk<exerciseType, exerciseType>('exercises/saveItem', async (item) => {
    return await api.saveExerciseItem(item);
})

const initialState: stateType = {
    data: []
};
const exercisesSlice = createSlice({
    name: 'exercises',
    initialState,
    reducers: {}, 
    extraReducers: (builder) => {
        builder.addCase(getAllExercises.fulfilled, (state, { payload }) => {
            state.data = payload;
        });
        builder.addCase(saveExercise.fulfilled, (state, { payload }) => {
            state.data.push(payload);
        });
    }
})

// Export section 
export const SLICE_CONSTANTS = { STREAMS, ACTIVITIES }
export const SLICE_ACTIONS = { getAllExercises, saveExercise, ...exercisesSlice.actions }
export type { streamTypes, activityTypes, exerciseType, stateType }
export default exercisesSlice.reducer;

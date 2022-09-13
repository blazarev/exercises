import { createSlice } from "@reduxjs/toolkit";

export const STREAM_TYPES = {
    BASE: 'BASE',
    FRAMEWORK: 'FRAMEWORK',
    ALGORITHMS: 'ALGORITHMS',
    ARCHITECTURE: 'ARCHITECTURE'
};
export const ACTIVITY_TYPES = {
    THEORY: 'THEORY',
    PRACTICE: 'PRACTICE'
};

type streamTypes = 'BASE' | 'FRAMEWORK' | 'ALGORITHMS' | 'ARCHITECTURE'; 
type activityTypes = 'THEORY' | 'PRACTICE';

export type exerciseType = {
    id: number,
    date: number,
    stream: streamTypes,
    duration: number, 
    activity: activityTypes
}

type trainigTypes = {
    data: exerciseType[]
}

const initialState: trainigTypes = {
    data: [{
        id: 888865,
        date: 1663068401351,
        stream: 'BASE',
        duration: 3600000, 
        activity: 'THEORY'
    }]
}

const exerciseSlice = createSlice({
    name: 'exercises',
    initialState,
    reducers: {
        add(state, action){
            state.data.push(action.payload);
        },
        patch(){}
    }
})

export const { add, patch } = exerciseSlice.actions;

export default exerciseSlice.reducer;

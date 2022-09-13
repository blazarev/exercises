import { configureStore } from "@reduxjs/toolkit";

import counterReducer from './features/counter-slice'
import exerciseReducer from './features/training';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        exercise: exerciseReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
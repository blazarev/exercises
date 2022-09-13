import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CounterState = {
    value: number
};

const initialState: CounterState = {
    value: 10
};

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment(state){ state.value += 1; },
        decrement(state){ state.value -= 1; },
        reset(state){ state.value = initialState.value }
    }
})

export const { increment, decrement, reset } = counterSlice.actions;

export default counterSlice.reducer;

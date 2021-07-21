import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'src/store'

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0
    },
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        }
    }
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions
export const getCount = (state: RootState): number => state.counter.value

export default counterSlice.reducer

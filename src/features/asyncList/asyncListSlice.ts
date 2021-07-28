import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import fetch from 'src/utils/fetch'

interface AsyncList {
    data: unknown[],
    loading: string
}

const initialState: AsyncList = {
    data: [],
    loading: 'idle'
}

const fetchDataByName = createAsyncThunk(
    'asyncList/fetchStatus',
    (name: string) => fetch(name)
)

const asyncListSlice = createSlice({
    name: 'asyncList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDataByName.fulfilled, (state, action: PayloadAction<unknown>) => {
            state.data.push(action.payload)
        })
    }
})

export { fetchDataByName }
export default asyncListSlice.reducer

import { configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import counterReducer from '../features/counter/counterSlice'

const store = configureStore({
    reducer: {
        counter: counterReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(createLogger())
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store

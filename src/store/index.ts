import { configureStore } from '@reduxjs/toolkit'
// import { createLogger } from 'redux-logger'
import { pokemonApi } from 'src/services/pokemon'
import asyncListSlice from 'src/features/asyncList/asyncListSlice'
import todoListSlice from 'src/features/todoList/todoListSlice'
import counterReducer from '../features/counter/counterSlice'

const store = configureStore({
    reducer: {
        counter: counterReducer,
        todoList: todoListSlice,
        asyncList: asyncListSlice,
        [pokemonApi.reducerPath]: pokemonApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pokemonApi.middleware)
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(createLogger())
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store

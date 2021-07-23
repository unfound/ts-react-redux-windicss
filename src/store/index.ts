import { configureStore } from '@reduxjs/toolkit'
// import { createLogger } from 'redux-logger'
import todoListSlice from 'src/features/todoList/todoListSlice'
import counterReducer from '../features/counter/counterSlice'

const store = configureStore({
    reducer: {
        counter: counterReducer,
        todoList: todoListSlice
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(createLogger())
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store

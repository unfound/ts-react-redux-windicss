import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'src/store'

export interface TodoListItem {
    id: number,
    text: string,
    completed: boolean
}

export type Filter = 'ALL' | 'COMPLETED' | 'ACTIVE'

export interface TodoList {
    filter: Filter,
    count: number,
    list: Array<TodoListItem>
}

const initialState: TodoList = {
    filter: 'ALL',
    count: 0,
    list: []
}

let listItemId = 0

const todoListSlice = createSlice({
    name: 'todoList',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<string>) => {
            state.list.push({
                id: listItemId++,
                text: action.payload,
                completed: false
            })
        },
        deleteItem: (state, action: PayloadAction<number>) => {
            state.list = state.list.filter(item => item.id !== action.payload)
        },
        completeItem: (state, action: PayloadAction<number>) => {
            state.list.forEach(item => {
                if (item.id === action.payload) {
                    item.completed = true
                }
            })
        },
        filterItem: (state, action:PayloadAction<Filter>) => {
            state.filter = action.payload
        },
        addCount: (state) => {
            state.count++
        }
    }
})

export const { addItem, completeItem, deleteItem, filterItem, addCount } = todoListSlice.actions

export const selectList = (state: RootState): Array<TodoListItem> => state.todoList.list
export const selectFilter = (state: RootState): Filter => state.todoList.filter
export const selectTodoList = (state: RootState): TodoList => state.todoList

export default todoListSlice.reducer

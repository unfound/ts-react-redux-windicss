import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import ListItem from "./ListItem"
import { selectList, deleteItem, completeItem, selectFilter } from './todoListSlice'

export default function List ():JSX.Element {
    const dispatch = useDispatch()

    const filterList = createSelector(
        [selectList, selectFilter],
        (todoList, filter) => {
            switch (filter) {
                case 'ACTIVE': return todoList.filter(item => !item.completed)
                case 'COMPLETED': return todoList.filter(item => item.completed)
                case 'ALL':
                default: return todoList
            }
        }
    )
    const visiabledTodoList = useSelector(filterList)
    return (
        <ul className="mt-4">
            {
                visiabledTodoList.map(
                    item => (
                        <ListItem
                            key={ item.id }
                            id={ item.id }
                            text={item.text}
                            completed={item.completed}
                            del={ (id: number) => dispatch(deleteItem(id)) }
                            done= { (id: number) => dispatch(completeItem(id)) }
                        />
                    )
                )
            }
        </ul>
    )
}
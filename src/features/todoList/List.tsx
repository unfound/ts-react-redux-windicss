import { useSelector, useDispatch } from 'react-redux'
import ListItem from "./ListItem"
import { selectList, deleteItem, completeItem, selectFilter, TodoListItem, Filter } from './todoListSlice'

export default function List ():JSX.Element {
    const todoList = useSelector(selectList)
    const filter = useSelector(selectFilter)
    const dispatch = useDispatch()

    function filterList(list: TodoListItem[], keyWord: Filter) {
        switch (keyWord) {
            case 'ACTIVE': return list.filter(item => !item.completed)
            case 'COMPLETED': return list.filter(item => item.completed)
            case 'ALL':
            default: return list
        }
    }
    return (
        <ul className="mt-4">
            {
                filterList(todoList, filter).map(
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
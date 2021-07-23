import className from 'classnames'
import { log } from 'src/utils/console'
import { TodoListItem } from './todoListSlice'

interface listItemProps extends TodoListItem {
    del: (id: number) => unknown,
    done: (id: number) => unknown
}

export default function ListItem (props: listItemProps): JSX.Element {
    log('=== item更新 ===')
    const { text, id, completed ,del, done } = props
    const textClass = className("mr-2 text-left flex-auto", {
        'line-through': completed
    })
    return (
        <li className="flex justify-between">
            <p className={ textClass }>{ text }</p>
            <div>
                {
                    completed ? <button type="button" className="btn-text" onClick={ () => del(id) }>删除</button>
                                : <button type="button" className="btn-text" onClick={ () => done(id) }>完成</button>
                }
            </div>
        </li>
    )
}
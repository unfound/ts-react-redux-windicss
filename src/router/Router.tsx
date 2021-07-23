import { useState, useEffect } from 'react'
import Counter from 'src/features/counter/Counter'
import TodoList from 'src/features/todoList/TodoList'

export default function Router (): JSX.Element {
    const url = window.location.hash.substr(1)
    const [route, setRoute] = useState(url)
    useEffect(() => {
        function routeChange () {
            setRoute(window.location.hash.substr(1))
        }
        window.addEventListener('hashchange', routeChange)
        return () => {
            window.removeEventListener('hashchange', routeChange)
        }
    }, [])

    let Child: React.FC
    console.log(route)
    switch (route) {
        case '/todo-list':
            Child = TodoList
            break
        default: Child = Counter
    }
    console.log(Child)

    return <Child />
}
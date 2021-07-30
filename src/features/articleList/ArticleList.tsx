import { useState } from 'react'
import Detail from "./Detail"
import Header from "./Header"
import List from "./List"

export default function ArticleList(): JSX.Element {
    const [visibled, setVisibled] = useState(false)
    const [id, setId] = useState('')
    function onConfirm () {
        setVisibled(false)
    }
    function onClickListItem (itemid: string) {
        setId(itemid)
        setVisibled(true)
    }
    return (
        <div className="p-2">
            <Header />
            <List onClickListItem={ onClickListItem }/>
            <Detail id={ id } visibled={ visibled } onConfirm={ onConfirm } />
        </div>
    )
}
import { useSelector, useDispatch } from 'react-redux'
import classNames from 'classnames'
import { selectFilter, filterItem, Filter } from './todoListSlice'

export default function Footer ():JSX.Element {
    const filter = useSelector(selectFilter)
    const dispatch = useDispatch()

    function setFilter (keyWord: Filter) {
        dispatch(filterItem(keyWord))
    }

    function getBtnClass (keyWord: Filter) {
        return classNames("btn-text", {
            'disabled:opacity-50': keyWord === filter
        })
    }
    return (
        <div className="text-right">
            <button type="button" className={ getBtnClass('ALL') } onClick={ () => setFilter('ALL') } disabled={ filter === 'ALL' }>全部</button>
            <button type="button" className={ getBtnClass('ACTIVE') }  onClick={ () => setFilter("ACTIVE") } disabled={ filter === 'ACTIVE' }>待办</button>
            <button type="button" className={ getBtnClass('COMPLETED') }  onClick={ () => setFilter("COMPLETED") } disabled={ filter === 'COMPLETED' }>已完成</button>
        </div>
    )
}

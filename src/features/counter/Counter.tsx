import { useSelector, useDispatch } from 'react-redux'
import { getCount, increment, decrement, incrementByAmount } from './counterSlice'

export default function Counter (): JSX.Element {
    const count = useSelector(getCount)
    const dispatch = useDispatch()
    return (
        <>
            <div>{ count }</div>
            <button type="button" onClick={ () => dispatch(increment()) }>+</button>
            <button type="button" onClick={ () => dispatch(decrement()) }>-</button>
            <button type="button" onClick={ () => dispatch(incrementByAmount(5)) }>+5</button>
        </>
    )
}

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useGetPokemonByIdQuery, usePatchPokemonByIdMutation } from 'src/services/pokemon'
import { getCount, increment, decrement, incrementByAmount } from './counterSlice'
import { fetchDataByName } from '../asyncList/asyncListSlice'

export default function Counter (): JSX.Element {
    const count = useSelector(getCount)
    const dispatch = useDispatch()
    const res = useGetPokemonByIdQuery(1)
    console.log(res)
    const [patchPokemonById, response] = usePatchPokemonByIdMutation()
    console.log('patch', response)
    useEffect(() => {
        dispatch(fetchDataByName('/test'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <div>{ count }</div>
            <button type="button" onClick={ () => dispatch(increment()) }>+</button>
            <button type="button" onClick={ () => dispatch(decrement()) }>-</button>
            <button type="button" onClick={ () => dispatch(incrementByAmount(5)) }>+5</button>
            <button type="button" onClick={ () => patchPokemonById({ id: 1, level: 599 }) }>Post</button>
        </>
    )
}

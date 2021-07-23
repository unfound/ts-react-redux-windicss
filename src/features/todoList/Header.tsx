import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { log } from 'src/utils/console'
import { addItem } from './todoListSlice'

export default function Header ():JSX.Element {
    log('===Header更新===')
    const [inputValue, setInputValue] = useState('')
    const dispatch = useDispatch()

    function handleInput (e: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value)
    }

    function handleClick () {
        dispatch(addItem(inputValue))
        setInputValue('')
    }
    return (
        <>
            <div className="flex justify-center align-middle">
                <input value={ inputValue } onChange={ handleInput } type="text" className="input w-52 mr-2"/>
                <button type="button" className="btn" onClick={ handleClick }>添加</button>
            </div>
        </>
    )
}
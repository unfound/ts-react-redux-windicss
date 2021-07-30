import { useState } from 'react'
import { 
    useAddArticleMutation,
} from 'src/services/article'

export default function Header(): JSX.Element {
    const [inputValue, setInputValue] = useState('')
    const [addArticle, { isLoading }] = useAddArticleMutation()

    function handleInput (e: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value)
    }

    function handleClick () {
        addArticle({name: inputValue})
        setInputValue('')
    }
    return (
        <div className="flex justify-center align-middle">
            <input value={ inputValue } onChange={ handleInput } type="text" className="input w-52 mr-2"/>
            <button type="button" className="btn" onClick={ handleClick } disabled={ isLoading }>{ isLoading ? 'loading': '添加'}</button>
        </div>
    )
}
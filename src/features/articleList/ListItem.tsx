import { useState, useRef, useEffect } from 'react'
import { useUpdateArticleMutation } from 'src/services/article'

interface Props {
    id: string,
    name: string,
    onClick?: (id: string) => void
}

export default function ListItem ({ id, name, onClick = () => {} }: Props): JSX.Element {
    const [inputVal, setInputVal] = useState(name)
    function handleInput (e: React.ChangeEvent<HTMLInputElement>) {
        setInputVal(e.target.value)
    }

    const [updateArticle] = useUpdateArticleMutation()

    const [editabled, setEditabled] = useState(false)
    function onConfirm () {
        if (name === inputVal) {
            setEditabled(false)
            return
        }
        updateArticle({id, name: inputVal}).then(() => {
            setEditabled(false)
        })
    }

    const inputRef = useRef<HTMLInputElement>(null)
    function onEdit () {
        console.log('onEdit===')
        setEditabled(true)
    }

    useEffect(() => {
        if (!editabled) return
        console.log('xxx')
        inputRef.current?.focus()
    }, [editabled])

    return (
        <div
            className="flex justify-between items-center text-left p-3 border-solid border-t border-t-gray-300 border-b-gray-300 last:border-b"
            role="menuitem"
            tabIndex={0}
        >
            {
                editabled ?
                    <input ref={ inputRef } type="text" className="input w-auto" value={ inputVal } onChange={ handleInput }/> :
                    <p className="leading-none">{ name }</p>
            }
            <div>
                {
                    editabled ?
                        <button type="button" className="btn px-2 py-1 text-xs" onClick={ onConfirm }>确定</button> :
                        <button type="button" className="btn px-2 py-1 text-xs" onClick={ onEdit }>编辑</button>
                }
                <button type="button" className="btn px-2 py-1 text-xs ml-1" onClick={() => { onClick(id) }}>查看</button>
            </div>
        </div>
    )
}

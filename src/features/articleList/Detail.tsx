import { useState, useEffect, useRef } from 'react'
import Modal from "components/Modal"
import { useGetArticleByIdQuery, useUpdateArticleMutation } from 'src/services/article'

interface Props {
    id: string
    visibled: boolean
    onConfirm: () => void
}

export default function Detail ({ id, visibled, onConfirm }: Props): JSX.Element {
    const { data, isFetching } = useGetArticleByIdQuery(id)
    const [updateArticle] = useUpdateArticleMutation()
    const [editabled, setEditabled] = useState(false)
    const [inputVal, setInputVal] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (editabled) {
            setInputVal(data?.detail || '')
            inputRef.current?.focus()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editabled])

    function onComplete () {
        if (inputVal === data?.detail) {
            setEditabled(false)
            return
        }
        updateArticle({id, detail: inputVal}).then(() => {
            setEditabled(false)
        })
    }

    function Footer (): JSX.Element {
        return (
            <div className="px-6 py-2 text-right">
                {
                    editabled ?
                        <button type="button" className="btn mr-2" onClick={ onComplete }>完成</button>:
                        <button type="button" className="btn mr-2" onClick={ () => { setEditabled(true) } }>编辑</button>
                }
                <button type="button" className="btn" onClick={ onConfirm }>关闭</button>
            </div>
        )
    }
    return (
        <Modal visabled={ visibled } footer={ Footer() }>
            {
                editabled ?
                    <input ref={ inputRef } type="textarea" className="input" value={ inputVal } onChange={(e) => { setInputVal(e.target.value) }}/>:
                    <p>{ isFetching ? 'loading……' : data?.detail }</p>
            }
        </Modal>
    )
}

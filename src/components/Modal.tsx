import ReactDOM from "react-dom"
import classNames from "classnames"

interface Props {
    visabled: boolean
    onConfirm?: () => void
    children?: JSX.Element | string
    footer?: JSX.Element
}

export function ModalBody ({ visabled, children = '', footer, onConfirm = () => {}}: Props,): JSX.Element {
    // key必须使用字符串，否则不会被windicss扫描到
    const modalRootClass = classNames({
        'invisible': !visabled
    })
    const modalMaskClass = classNames('animate-duration-500 fixed top-0 right-0 left-0 bottom-0 z-999 bg-gray-900 bg-opacity-50', {
        'animate-zoom-in': visabled,
    })
    const modalWrapperClass = classNames('animate-duration-500 fixed top-0 right-0 left-0 bottom-0 z-1000 overflow-auto outline-none', {
        'animate-zoom-in': visabled
    })

    return (
        <div className={ modalRootClass }>
            <div className={ modalMaskClass }/>
            <div className={ modalWrapperClass }>
                <div className="w-4/5 box-borderx text-black text-md pointer-events-none relative top-24 max-w-[calc(100vw - 32px)] mx-auto my-0">
                    <div className="relative bg-gray-50 border-none rounded shadow-modal pointer-events-auto">
                        <div className="px-6 py-2 font-bold text-lg">标题</div>
                        <div className="p-6 break-words">{ children }</div>
                        {
                            footer ||
                            <div className="px-6 py-2 text-right">
                                <button type="button" className="btn" onClick={ onConfirm }>确定</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Modal (props: Props): JSX.Element {
    return ReactDOM.createPortal(<ModalBody {...props} />, document.body)
}

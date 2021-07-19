interface CounterReduxProps {
    value: number,
    onIncrement: () => void,
    onDecrement: () => void
}

export default function CounterRedux ({value, onIncrement, onDecrement}: CounterReduxProps): JSX.Element {
    return (
        <div>
            <h1>{ value }</h1>
            <button onClick={ onIncrement } type="button">add</button>
            <button onClick={ onDecrement } type="button">decrement</button>
        </div>
    )
}

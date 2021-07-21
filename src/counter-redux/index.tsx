import { connect } from 'react-redux'
import { Dispatch } from "redux"

interface CounterReduxProps {
    value: number,
    onIncrement: () => void,
    onDecrement: () => void
}

function CounterRedux ({value, onIncrement, onDecrement}: CounterReduxProps): JSX.Element {
    return (
        <div>
            <h1>{ value }</h1>
            <button onClick={ onIncrement } type="button">add</button>
            <button onClick={ onDecrement } type="button">decrement</button>
        </div>
    )
}

function mapStateToProps (state: Record<string, unknown>) {
    return { value: state.changeCount as number }
}

function mapDispatchToProps (dispatch: Dispatch) {
    return {
        onIncrement: () => {
            dispatch({ type: 'INCREMENT' })
        },
        onDecrement: () => {
            dispatch({ type: 'DECREMENT' })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CounterRedux)

import fetch from 'src/utils/fetch'
import { useEffect } from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import { createLogger } from 'redux-logger'
import * as reducer from './counter-redux/reducer'
import CounterRedux from './counter-redux'
import Test from './components/test'
import { useForceUpdate } from './hooks'
import { postsBySubreddit, fetchPostsIfNeeded } from './utils/redux-fetch'

const store = createStore(
  combineReducers({...reducer, postsBySubreddit}),
  applyMiddleware(thunk as ThunkMiddleware<Record<string, unknown>>, createLogger())
)

export default function App(): JSX.Element {
  const forceUpdate = useForceUpdate()

  function dispatch (action: { type: string, payload?: any }): void {
    store.dispatch(action)
    store.dispatch(fetchPostsIfNeeded('test'))
    forceUpdate()
  }

  useEffect(() => {
    fetch<Array<Record<string, unknown>>>('/test', {
      params: {
        test:'xxx'
      },
      method: 'GET'
    }).then(res => {
        console.log(res)
        dispatch({type: 'CHANGE_USER', payload: res[0]})
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="text-center container mx-auto">
      <div className="App">hello world</div>
      <Test />
      <div>{ store.getState().testInfo.title}</div>
      <div id="CounterRedux">
        <CounterRedux
          value={ store.getState().changeCount }
          onIncrement={() => dispatch({ type: 'INCREMENT' })}
          onDecrement={() => dispatch({ type: 'DECREMENT' })}
        />
      </div>
    </div>
  )
}

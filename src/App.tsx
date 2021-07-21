import CounterRedux from './counter-redux'
import Test from './components/test'

export default function App(): JSX.Element {

  return (
    <div className="text-center container mx-auto">
      <div className="App">hello world</div>
      <Test />
      <div id="CounterRedux">
        <CounterRedux />
      </div>
    </div>
  )
}

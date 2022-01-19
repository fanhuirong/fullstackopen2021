import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {

  // step 6.1 6.2
  const clickBtn = (type)=>{
    store.dispatch({
      type
    })
  }

  return (
    <div>
      <button onClick={()=>clickBtn('GOOD')}>good</button> 
      <button onClick={()=>clickBtn('OK')}>ok</button> 
      <button onClick={()=>clickBtn('BAD')}>bad</button>
      <button onClick={()=>clickBtn('ZERO')}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)

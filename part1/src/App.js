import React, { useState } from 'react'
import Header from './components/Header'
import Content from './components/Content'
import Total from './components/Total'

const Statistics = (props) => {
  return (<div>
    <Header course="statics" />
    <p>good {props.good}</p>
    <p>neutral {props.neutral}</p>
    <p>bad {props.bad} </p>
    <p>all {props.getAll()}</p>
    <p>average {props.getAvg()}</p>
    <p>positive {props.getPos()}%</p>
  </div>)
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const getAll = () => good + bad + neutral
  const getAvg = () => (good + bad * (-1)) / (good + bad + neutral)
  const getPos = () => (good / (good + bad + neutral)) * 100

  return (
    <div>
      <Header course="give feedback" />
      {/* <Content parts={course.parts} />
      <Total parts={course.parts} /> */}
      <button onClick={() => { setGood(good + 1) }}>good</button>
      <button onClick={() => { setNeutral(neutral + 1) }}>neutral</button>
      <button onClick={() => { setBad(bad + 1) }}>bad</button>
      <Statistics good={good} bad={bad} neutral={neutral} getAll={getAll} getAvg={getAvg} getPos={getPos} />
    </div>
  )
}

export default App
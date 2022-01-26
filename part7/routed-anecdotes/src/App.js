import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, useRouteMatch
} from "react-router-dom"
import About from './components/About'
import Menu from './components/Menu'
import AnecdoteList from './components/AnecdoteList'
import Footer from './components/Footer'
import CreateNew from './components/CreateNew'
import Anecdote from './components/Anecdote'

const App = () => {

  const [notification, setNotification] = useState(null);
  
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])
  const match = useRouteMatch('/anecdotes/:id')
  const anecdote = match 
    ? anecdotes.find(item => item.id === match.params.id)
    : null
    

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(
      `A new anecdote ${anecdote.content} is succesfully created.`
    )
    setTimeout(() => setNotification(null), 10000)
  }

  return (
      <div>
        <Menu />
        {notification && (
          <div
            style={{ border: "1px dashed tomato", margin: "5px", padding: "5px" }}
          >
            {notification}
          </div>
        )}
        <Switch>
          <Route path="/about"> 
            <About /> 
          </Route>
          <Route path="/create"> 
            <CreateNew addNew={addNew} />
          </Route>
          <Route path="/anecdotes/:id">
            <Anecdote anecdote={anecdote} />
          </Route>
          {/* / last one */}
          <Route path="/"> 
            <AnecdoteList anecdotes={anecdotes} /> 
          </Route>

        </Switch>
        <Footer />
      </div>
  );
}

export default App;
import React,{ useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { initAnecdotes } from './reducers/anecdoteReducer'
import anecdotesService from './services/anecdotes'



const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdotesService
      .getAll().then(list => dispatch(initAnecdotes(list)))
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteForm/>
      <Notification/>
      <AnecdoteList/>
    </div>
  )
}

export default App
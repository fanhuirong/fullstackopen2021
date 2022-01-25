
import React from 'react'
import { useDispatch } from 'react-redux'
import { add } from '../reducers/anecdoteReducer'
import {showNotification,hideNotification} from '../reducers/notificationReducer'
import AnecdotesService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const create =  async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    // step 6.14
    // const NewAnecdote = await AnecdotesService.createNew(content)
    // step 6.16
    dispatch(add(content))
    
    // step 6.11
    // dispatch(showNotification(`New anecdote was added: ${content}`));
    // setTimeout(() => dispatch(hideNotification()), 5000);

    // step 6.18
    dispatch(showNotification(`New anecdote was added: ${content}`, 10))
  }

  return (
      <form onSubmit={create}>
        <h2>create new</h2>
        <div><input name='note'/></div>
        <button type='submit'>create</button>
      </form>
  )
}

export default AnecdoteForm
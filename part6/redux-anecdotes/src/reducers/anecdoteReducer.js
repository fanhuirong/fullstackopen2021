import anecdotesService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

// step 6.6
export const voteAnec = (id) =>{
  return {
    type: 'VOTE',
    data: {
      id
    }
  }
}

export const add = (content) =>{
  return async dispatch => {
    const newItem = await anecdotesService.createNew(content)
    dispatch({
      type: 'ADD',
      data: newItem
    })
  }
}

export const initAnecdotes = () => {
  return async dispatch =>{
    const list = await anecdotesService.getAll()
    dispatch({
      type: 'INIT',
      data: list
    })
  }
}

const initialState = anecdotesAtStart.map(asObject)

export const reducer = (state = initialState, action) => {
  // console.log('state now: ', state)
  // console.log('action', action)
  switch (action.type) {
    case 'VOTE':
      return state.map(item => item.id === action.data.id ? {...item, votes: item.votes + 1 } : item)
    case 'ADD':
      return state.concat(action.data);
    case 'INIT':
      return action.data;
    default:
      return state;
  }

}
export default reducer;


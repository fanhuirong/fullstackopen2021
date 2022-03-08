import { useState } from 'react'
import { gql, useQuery } from '@apollo/client';
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const ALL_AUTHORS = gql`
query {
  allAuthors  {
    name
    id
    born
    bookCount
  }
}
`
const App = () => {

  const queryAuthors = useQuery(ALL_AUTHORS)
  const [page, setPage] = useState('authors')

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>
     {!(queryAuthors.loading ) && <Authors authors={queryAuthors?.data?.allAuthors} show={page === 'authors'} />}

      <Books show={page === 'books'} queryAuthors={queryAuthors}/>

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App

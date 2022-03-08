import { useState } from 'react'
import { useQuery } from '@apollo/client';
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import {QUERY_ALL_AUTHOR} from './queries'


const App = () => {

  const res = useQuery(QUERY_ALL_AUTHOR)
  const [page, setPage] = useState('authors')

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>
     {!(res.loading ) && <Authors queryAuthors={QUERY_ALL_AUTHOR}  authors={res?.data?.allAuthors} show={page === 'authors'} />}

      <Books show={page === 'books'} queryAuthors={QUERY_ALL_AUTHOR}/>

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App

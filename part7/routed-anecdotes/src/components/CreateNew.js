
import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import { useField } from '../hooks'

const CreateNew = (props) => {
  const history = useHistory()
  // const [content, setContent] = useState('')
  // const [author, setAuthor] = useState('')
  // const [info, setInfo] = useState('')

  // step 7.6
  const {onReset: resetContent, ...content} = useField('text')
  const {onReset: resetAuthor, ...author} = useField('text')
  const {onReset: resetInfo, ...info} = useField('text')

  const handleSubmit = (e) => {
    console.log('sub')
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    history.push("/");
  }

  const handleReset = () =>{
    console.log('reset')
    resetInfo();
    resetAuthor();
    resetContent()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content'           
            type={content.type}
            value={content.value}
            onChange={content.onChange}  />
        </div>
        <div>
          author
          <input name='author' {...author} />
        </div>
        <div>
          url for more info
          <input name='info' {...info} />
        </div>
        <button type='submit'>create</button>
        <button type="button" onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}

export default CreateNew
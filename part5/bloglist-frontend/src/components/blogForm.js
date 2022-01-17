import React, { useState } from 'react'

const BlogForm = ({ onSubmit}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(0)


  const handleSubmit = (event)=>{
    event.preventDefault()
    onSubmit({
      title,author,url,likes
    })
  }
  return (
    <div>
      <h2>Create a new Blog</h2>

     <form onSubmit={handleSubmit}>
        <div>
          title
            <input
            id='title'
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
            <input
            id='author'
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
            <input
            id='url'
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          likes
            <input
            id='likes'
            type="number"
            value={likes}
            name="Likes"
            onChange={({ target }) => setLikes(target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default BlogForm
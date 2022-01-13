import React from 'react'
import Togglable from './Togglable'
const Blog = ({blog}) => (
  <div className="blog">
    <span>{blog.title}</span> {blog.author}
    <Togglable buttonLabel="show Detail">
      <div className='hide'>
      <p>{blog.likes}</p>
      <p>{blog.url}</p>
      </div>
    </Togglable>
  </div>  
)

export default Blog
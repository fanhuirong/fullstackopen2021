import React from 'react'
const Blog = ({blog}) => (
  <div className="blog">
    <span>{blog.title}</span> {blog.author}
  </div>  
)

export default Blog
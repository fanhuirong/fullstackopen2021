import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(0)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

    useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user) // 存储服务器返回的token等数据
      blogService.setToken(user.token)
      window.localStorage.setItem( // 避免页面重新渲染时，user 的登录信息就没了。
        'loggedUser', JSON.stringify(user)
      ) 
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Wrong credentials')
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
  }

  const handleAdd = async (event) => {
    event.preventDefault()
    try {
      const blog = await blogService.createBlog({
        title,
        author,
        url,
        likes
      })
      setTitle('')
      setUrl('')
      setLikes(0)
      setAuthor('')
    } catch (exception) {
      console.log('Wrong credentials')
    }
  }

  const loginForm = ()=>(
     <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
  )
  const blogForm= ()=> (
     <form onSubmit={handleAdd}>
        <div>
          title
            <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
            <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
            <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          likes
            <input
            type="number"
            value={likes}
            name="Likes"
            onChange={({ target }) => setLikes(target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
  )

  const blogList = () =>(
    <div>
      <div>user name: {user?.name} <button onClick={()=>logout()}>logout</button></div>
      <div>blog list</div>
      {blogs.map(item=> {
        return <div>{item.title}</div>
      })}
    </div>
  )

  return (
    <div>   
      <h2>blogs</h2>
      {user === null && loginForm()}
      {user !== null && blogForm()}

      {user !== null && blogList()}
    </div>
      
  )
}

export default App
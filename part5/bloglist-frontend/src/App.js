import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/blogForm'
import Togglable from './components/Togglable'
import Blog from './components/Blog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [showWrong, setShowWrong] = useState(false)


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
      setShowWrong(false)
    } catch (exception) {
      setShowWrong(true)
      console.log('Wrong credentials')
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
  }

  // step 5.3
  // const handleAdd = async (event) => {
  //   event.preventDefault()
  //   try {
  //     const blog = await blogService.createBlog({
  //       title,
  //       author,
  //       url,
  //       likes
  //     })
  //     setTitle('')
  //     setUrl('')
  //     setLikes(0)
  //     setAuthor('')
  //   } catch (exception) {
  //     console.log('Wrong credentials')
  //   }
  // }

  const handleAdd = async (formData) => {
    try {
      const blog = await blogService.createBlog(formData)
      if(blog){
        blogService.getAll().then(blogs =>
          setBlogs( blogs )
        )  
      }
    } catch (exception) {
      console.log('Wrong credentials')
    }
  }

  const loginForm = ()=>(
     <form onSubmit={handleLogin}>
        <div>
          username
            <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-btn" type="submit">login</button>
      </form>
  )

  const blogList = () =>(
    <div>
      <div>user name: {user?.name} <button onClick={()=>logout()}>logout</button></div>
      <div>blog list</div>
      {blogs.map((item,index)=> {
        return <Blog key={index} blog={item}/>
      })}
    </div>
  )

  return (
    <div>   
      <h2>blogs</h2>
      {user === null && loginForm()}
      { showWrong && <p>Wrong credentials</p>}
      {user !== null && <Togglable buttonLabel="create new blog">
        <BlogForm onSubmit={handleAdd}/>
      </Togglable>}

      {user !== null && blogList()}
    </div>
      
  )
}

export default App
const blogsRouter = require('express').Router()
// 引入数据库Schema的model
const Blog = require('../models/blogs')
const User = require('../models/users')

// getAll
// blogsRouter.get('/', (request, response) => {
//   Blog.find({}).then(notes => {
//     response.json(notes)
//   })
// })

// step 4.8
// async await 版本
blogsRouter.get('/', async (request, response) => {
  const notes = await Blog.find({})
  response.json(notes)
})

// Add 
// blogsRouter.post('/', (request, response) => {
//   const blog = new Blog(request.body)

//   blog
//     .save()
//     .then(result => {
//       response.status(200).json(result)
//     })
// })
// step 4.10
// async await
blogsRouter.post('/', async (request, response, next) => {
  // const blog = new Blog(request.body)
  const body = request.body
  const user = await User.findById(body.userId)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })
  try {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog);
    await user.save();
    response.status(200).json(savedBlog)
  } catch (error) {
    next(error)
  }

})

// get by id
// blogsRouter.get('/:id', (request, response) => {
//   const id = request.params.id
//   Blog.findById(id).then(blog => {
//     if (blog) {
//       response.status(200).json(blog)
//     } else {
//       response.status(404).end()
//     }
//   })
// })
blogsRouter.get('/:id', async(request, response, next) => {
  const id = request.params.id
  const blog = await Blog.findById(id)
  try {
    if (blog) {
      response.status(200).json(blog)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

// delete by id
// blogsRouter.delete('/:id', (request, response, next) => {
//   Blog.findByIdAndRemove(request.params.id)
//     .then(result => {
//       response.status(204).end()
//     })
//     .catch((error) => next(error));
// })
blogsRouter.delete('/:id', async(request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter
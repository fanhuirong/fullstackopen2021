const blogsRouter = require('express').Router()
// 引入数据库Schema的model
const Blog = require('../models/blogs')

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
// async await
blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  try {
    const savedBlog = await blog.save();
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
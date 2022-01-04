const blogsRouter = require('express').Router()
// 引入数据库Schema的model
const Blog = require('../models/blogs')

// blogsRouter.get('/', (request, response) => {
//   Blog.find({}).then(notes => {
//     response.json(notes)
//   })
// })

// async await 版本
blogsRouter.get('/', async (request, response) => {
  const notes = await Blog.find({})
    response.json(notes)
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(200).json(result)
    })
})

module.exports = blogsRouter
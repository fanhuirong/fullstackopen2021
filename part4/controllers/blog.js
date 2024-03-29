const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const middleware = require("../utils/middleware");

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
blogsRouter.get('/', middleware.userExtractor, async (request, response) => {
  const notes = await Blog.find({})
  const user = request.user;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }
  return response.json(notes)
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
blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  // const blog = new Blog(request.body)
  const body = request.body
  const user = request.user;

  // add token 
  // step 4.19
  // const token = getTokenFrom(request)
  // const decodedToken = jwt.verify(token, process.env.SECRET)
  // if (!token || !decodedToken.id) {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }
  // step 4.19
  // const user = await User.findById(decodedToken.id)
  // const user = await User.findById(body.userId)
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
blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  // try {
  //   await Blog.findByIdAndRemove(request.params.id)
  //   response.status(204).end()
  // } catch (error) {
  //   next(error)
  // }
  // step 4.21
  const blog = await Blog.findById(request.params.id);
  // step 4.22
  const user = request.user;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({
      error: "token missing or invalid"
    });
  }

  // const user = await User.findById(decodedToken.id);
  console.log('blog',blog )
  console.log('user',user)
  if (blog?.user.toString() === user?.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } else {
    return response.status(401).json({
      error: "you do not have permission to delete this blog",
    });
  }
})

module.exports = blogsRouter
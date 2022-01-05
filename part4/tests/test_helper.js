const Blog = require('../models/blogs')
const User = require('../models/users')

const initialNotes = [{
    title: "heheooo",
    author: "kunkun",
    url: "xxxx",
    likes: 222
  },
  {
    title: "monster",
    author: "hunhun",
    url: "xxxx",
    likes: 11
  },
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: "test",
    author: "test",
    url: "test",
    likes: 11
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(note => note.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialNotes,
  nonExistingId,
  blogsInDb,
  usersInDb
}
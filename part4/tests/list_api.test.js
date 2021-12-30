const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blogs')
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

// 清空数据库，确保每次测试数据一样
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialNotes[0])
  await blogObject.save()
  blogObject = new Blog(initialNotes[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialNotes.length)
})

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)
  //  代码response.body.map(r => r.content)命令用于创建一个数组，该数组包含 API 返回的每个便笺的内容。toContain 方法用于检查作为参数传给它的便笺是否在 API 返回的便笺列表中。
  expect(contents).toContain(
    'monster'
  )
})
afterAll(() => {
  mongoose.connection.close()
})
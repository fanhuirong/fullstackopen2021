const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

const Blog = require('../models/blogs')

// 清空数据库，确保每次测试数据一样
// beforeEach(async () => {
//   await Blog.deleteMany({})
//   let blogObject = new Blog(helper.initialNotes[0])
//   await blogObject.save()
//   blogObject = new Blog(helper.initialNotes[1])
//   await blogObject.save()
// })
// refactor with promise
beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObject = helper.initialNotes
    .map(blog => new Blog(blog))
  const promiseArray = blogObject.map(blog => blog.save())
  await Promise.all(promiseArray)
})

// step 4.8
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
// step 4.8
test('all notes are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialNotes.length)
})

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)
  //  代码response.body.map(r => r.content)命令用于创建一个数组，该数组包含 API 返回的每个便笺的内容。toContain 方法用于检查作为参数传给它的便笺是否在 API 返回的便笺列表中。
  expect(contents).toContain(
    'monster'
  )
})

test('a valid note can be added', async () => {
  const newNote = {
    "title": "oh------",
    "author": "sehun",
    "url": "ttt",
    "likes": 111
  }

  await api
    .post('/api/blogs')
    .send(newNote)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  // const response = await api.get('/api/blogs')
  const blogAtEnd = await helper.blogsInDb();
  const contents = blogAtEnd.map(r => r.title)

  expect(blogAtEnd).toHaveLength(helper.initialNotes.length + 1)
  expect(contents).toContain(
    'oh------'
  )
})

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const blogToView = blogsAtStart[0]
  const resultNote = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
  expect(resultNote.body).toEqual(processedBlogToView)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialNotes.length - 1
  )

  const title = blogsAtEnd.map(r => r.title)

  expect(title).not.toContain(blogToDelete.title)
})


afterAll(() => {
  mongoose.connection.close()
})
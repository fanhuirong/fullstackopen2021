const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const { v1: uuid } = require("uuid");
const { MONGODB_URI } = require('./config')

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Author{
    name: String
    id: ID!
    born: Int
    bookCount: Int
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String
      author: String
      published: Int
      genres: [String]
    ): Book
    editAuthor(
      name: String!
      born: Int!
    ): Author
}
`

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: () => Book.find({}),
    allAuthors: () => Author.find({}),
  },
  Author: {
    // 自定义解析器
    bookCount: (root) => {
      return books.filter((b) => b.author === root.name).length;
    },
  },
  Mutation: {
    addBook: (root, args) => {
      const book = { ...args, id: uuid() }
      const currentAuthor = args.author
      authors = authors.find(item => item.name === currentAuthor) ? [...authors] : authors.concat({   
          name: currentAuthor,
          born: null,
          bookCount: 1,})

      books = books.concat(book)
      return book
    },

    editAuthor: (root, args) => {
      const author = authors.find(a => a.name === args.name)
      if(!author){
        return null
      }

      const newAuthor = {...author, born: args.born}
      authors = authors.map(item => item.name === args.name ? newAuthor : item)
      return newAuthor
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
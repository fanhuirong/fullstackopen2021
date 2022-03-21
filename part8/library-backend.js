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
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Int!
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
    me: User
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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
}
`

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: () => Book.find({}),
    // TODO
    allAuthors: () => Author.find({}),
  },
  Author: {
    // 自定义解析器
    bookCount: async (root) =>
      await Book.find({ author: root.id }).countDocuments(),
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({
          name: args.author,
          id: uuid(),
        })
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
      let book = new Book({
        ...args,
        author: author.id,
        id: uuid(),
      })
      try {
        await book.save()
        book = await book.populate('author').execPopulate()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return book
    },

    editAuthor: async(root, args) => {
      const authorExist = await Author.findOne({ name: args.name })
      if (!authorExist) {
        throw new AuthenticationError('not authenticated')
      }

      try {
        const author = await Author.findOneAndUpdate(
          { name: args.name },
          { born: args.born },
          { new: true }
        )
        return author
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
import { gql  } from '@apollo/client'

export const UPDATE_AUTHOR = gql`
  mutation updateAuthor($name: String!, $born: Int! ) {
    editAuthor(
      name: $name
      born: $born
      ){
        born
        name
      }
  }
`

export const QUERY_ALL_AUTHOR = gql`
  query {
    allAuthors{
      name
      id
      born
      bookCount
    }
  }
`
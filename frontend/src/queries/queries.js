import { gql } from 'apollo-boost'; // bind/parse graphQl to Javascript

const getBooksQuery = gql`
    {
        books {
            id
            name
            genre
            author {
                id
                name
                books {
                    name
                    genre
                }
            }
        }
    }
`

const getAuthorsQuery = gql`
    {
        authors {
            id
            name
        }
    }
`
// ($name: String!, $genre: String!, $authorId: ID!) $ means variable, ! means not null
const postAuthorQuery = gql`
    mutation ($name: String!, $genre: String!, $authorId: ID!) {
        addBook(name: $name, genre: $genre, authorId: $authorId) {
            id
            name
            genre
            author {
                name
            }
        }
    }
`

export {
    getBooksQuery,
    getAuthorsQuery,
    postAuthorQuery
}
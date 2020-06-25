const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLList,GraphQLSchema } = graphql;


//DUMMY DATA FOR BOOKS
// const books = [
//     {id: '1', name: 'Name Of The Wind', genre: 'Fantasy', authorId: '1'},
//     {id: '2', name: 'The Final Empire', genre: 'Fantasy', authorId: '2'},
//     {id: '3', name: 'The Long Earth', genre: 'Sci-Fi', authorId: '1'}
// ]
// const authors = [
//     {id: '1', name: 'Francis Cabrel', age: 34},
//     {id: '2', name: 'Albert Camu', age: 37},
//     {id: '3', name: 'Victor Hugo', age: 77}
// ]


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID},
        name: { type: GraphQLString},
        genre: { type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args) { 
                //parent is the books object
                return _.find(authors, {id: parent.authorId})
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID},
        name: { type: GraphQLString},
        age: { type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, {authorId: parent.id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: { // Query for a single book
            type: BookType,
            args: { id: {type: GraphQLID}}, // Querying by the book id
            resolve(parent, args){ // code to get data from DB/other sources
                return _.find(books, {id: args.id})
            }
        },

        books: { // Query for a single book
            type: new GraphQLList(BookType),
            resolve(parent, args){ // code to get data from DB/other sources
                return books
            }
        },

        author: {
            type: AuthorType,
            args: { id: {type: GraphQLID}}, 
            resolve(parent, args){ 
                return _.find(authors, {id: args.id})
            }
        },

        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){ 
                return authors
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})
const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;


//DUMMY DATA FOR BOOKS
const books = [
    {id: '1', name: 'Name Of The Wind', genre: 'Fantasy'},
    {id: '2', name: 'The Final Empire', genre: 'Fantasy'},
    {id: '3', name: 'The Long Earth', genre: 'Sci-Fi'}
]


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString},
        name: { type: GraphQLString},
        genre: { type: GraphQLString}
    })
})

// const AuthorType = new GraphQLObjectType({
//     name: 'Author',
//     fields: () => ({
//         id: { type: GraphQLString},
//         name: { type: GraphQLString},
//         age: { type: GraphQLInt}
//     })
// })

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: { // Query for a single book
            type: BookType,
            args: { id: {type: GraphQLString}}, // Querying by the book id
            resolve(parent, args){ // code to get data from DB/other sources
                return _.find(books, {id: args.id})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})
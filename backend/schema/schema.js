const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLNonNull, GraphQLList,GraphQLSchema } = graphql;

const Author = require('../models/author');
const Book = require('../models/book');

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
                // return _.find(authors, {id: parent.authorId})
                return Author.findById(parent.authorId);
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
                // return _.filter(books, {authorId: parent.id})
                return Book.find({authorId: parent.id});
            }
        }
    })
})

const SkillType = new GraphQLObjectType({
    name: 'Skill',
    fields: () => ({
        id: { type: GraphQLID},
        skill: { type: GraphQLString},
        deleted: { type: GraphQLString },
        // volunteers: {
        //     type: new GraphQLList(VolunteerType),
        //     resolve(parent, args) {
        //         // return _.filter(books, {authorId: parent.id})
        //     }
        // }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: { // Query for a single book
            type: BookType,
            args: { id: {type: GraphQLID}}, // Querying by the book id
            resolve(parent, args){ // code to get data from DB/other sources
                // return _.find(books, {id: args.id})
                return Book.findById(args.id);
            }
        },

        books: { // Query for a single book
            type: new GraphQLList(BookType),
            resolve(parent, args){ // code to get data from DB/other sources
                // return books
                return Book.find({});
            }
        },

        author: {
            type: AuthorType,
            args: { id: {type: GraphQLID}}, 
            resolve(parent, args){ 
                // return _.find(authors, {id: args.id})
                return Author.findById(args.id)
            }
        },

        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){ 
                // return authors
                return Author.find({})
            }
        },

        skill: {
            type: SkillType,
            args: { id: {type: GraphQLID}}, 
            resolve(parent, args){ 
                // return _.find(authors, {id: args.id})
            }
        },

        skills: {
            type: new GraphQLList(SkillType),
            resolve(parent, args){ 

            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                const newAuthor = new Author({
                    name: args.name,
                    age: args.age
                });
                return newAuthor.save();
            }
        },

        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                const newBook = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                }); 
                // =>
                // const newBook = new Book(args);
                return newBook.save();
            }
        },

    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
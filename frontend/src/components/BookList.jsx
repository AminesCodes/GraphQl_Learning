import React, { useState, useEffect} from 'react';
import { gql } from 'apollo-boost'; // bind/parse graphQl to Javascript
import { useQuery } from '@apollo/react-hooks'

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

export default function BookList() {
    const [ books, setBooks ] = useState([]);

    const { loading, error, data } = useQuery(getBooksQuery);
    console.log(data)

    useEffect(() => {
        if (!loading && data) {
            setBooks(data.books);
        }
    }, [loading]);
    
    if (error) {
        return <p>Sorry, something went wrong!</p>
    }


    return (
        <ul>
            Books:
            {
                books.length
                ?   books.map(book => <li key={book.id}>{book.name} by {book.author.name}</li>)
                :   <p>Loading...</p>
            }
        </ul>
    )
}
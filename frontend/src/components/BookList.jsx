import React from 'react';
// import React, { useState, useEffect} from 'react';
import { useQuery } from '@apollo/react-hooks';

import AddBookForm from './AddBookForm';
import { getBooksQuery } from '../queries/queries'


export default function BookList() {
    // const [ books, setBooks ] = useState([]);

    const { loading, error, data } = useQuery(getBooksQuery);
    console.log(data)

    // useEffect(() => {
    //     if (!loading && data) {
    //         setBooks(data.books);
    //     }
    //     // eslint-disable-next-line 
    // }, [loading]);
    
    if (error) {
        return <p>Sorry, something went wrong!</p>
    }


    return (
        <>
        <ul>
            Books:
            {
                !loading
                ?   data && data.books
                    ? data.books.map(book => <li key={book.id}>{book.name} by {book.author.name}</li>)
                    : null
                :   <p>Loading...</p>
            }
        </ul>

        <AddBookForm />
        </>
    )
}
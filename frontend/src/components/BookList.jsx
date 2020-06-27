// import React from 'react';
// import React, { useState, useEffect} from 'react';
import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import AddBookForm from './AddBookForm';
import BookDetails from './BookDetails';
import { getBooksQuery } from '../queries/queries'


export default function BookList() {
    // const [ books, setBooks ] = useState([]);
    const [ targetBook, setTargetBook ] = useState('');

    const { loading, error, data, refetch } = useQuery(getBooksQuery);

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
                    ? data.books.map(book => <li key={book.id} onClick={() => setTargetBook(book.id)}>{book.name} by {book.author.name}</li>)
                    : null
                :   <p>Loading...</p>
            }
        </ul>

        {/* <button onClick={refetch}>Refresh List</button> */}
        <button onClick={() => refetch()}>Refresh List</button>

        {
            targetBook
            ?   <>
                    <button onClick={() => setTargetBook('')}>Close</button>
                    <BookDetails id={targetBook} />
                </>
            :   null
        }

        <AddBookForm />
        </>
    )
}
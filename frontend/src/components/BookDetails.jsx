import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { getSingleQuery } from '../queries/queries'


export default function BookDetails(props) {
    const bookId = props.id;
    let book = null;

    const { loading, error, data } = useQuery(getSingleQuery, { variables: {id: bookId} });
    console.log(data)
    if (!loading && data) {
        book = data.book;
    }
    
    if (error) {
        console.dir(error)
        return <p>Sorry, something went wrong!</p>
    }

    if (loading) {
        return <p>Loading...</p>
    }


    return (
        <div>
            Book:
            {
                book
                ?   <p>
                        {book.name} ({book.genre}) 
                        by {book.author.name} - {book.author.age} years old - 
                        Books: {book.author.books.map(bk => <span key={bk.id}>{bk.name} - {bk.genre}, </span>)}</p>
                :   null
            }
        </div>
    )
}
import React, { useState, useEffect} from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks'

import { getAuthorsQuery, postAuthorQuery, getBooksQuery } from '../queries/queries';

export default function AddBookForm() {
    const [ authors, setAuthors ] = useState([]);
    const [ name, setName ] = useState('');
    const [ genre, setGenre ] = useState('');
    const [ authorId, setAuthorId ] = useState('');

    const { loading, error, data } = useQuery(getAuthorsQuery);
    console.log(data)

    useEffect(() => {
        if (!loading && data) {
            setAuthors(data.authors);
        }
        // eslint-disable-next-line 
    }, [loading]);
    

    // Mutation & Handle Submit
    const [ addBook, response ] = useMutation(postAuthorQuery);

    const handleAddBook = (e) => {
        e.preventDefault();

        addBook({ 
            variables: { name: name, genre: genre , authorId: authorId},
            refetchQueries: [{query: getBooksQuery}]
        });
        console.log(1000, response)
    }


    if (error) {
        return <p>Sorry, something went wrong!</p>
    }

    return (
        <form onSubmit={handleAddBook}> 
            <div>
                <label> Book Title
                    <input type='text' value={name} onChange={e => setName(e.target.value)} />
                </label>
            </div>

            <div>
                <label> Genre
                    <input type='text' value={genre} onChange={e => setGenre(e.target.value)} />
                </label>
            </div>

            <div>
                <label> Author
                    <select value={authorId} onChange={e => setAuthorId(e.target.value)}>
                        <option value=''>Select Author</option>
                        {
                            authors.map(author => <option key={author.id} value={author.id}>{author.name}</option>)
                        }
                    </select>
                </label>
            </div>

            <button>Add</button>
        </form>
    )
}
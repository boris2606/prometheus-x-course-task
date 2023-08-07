import React, { useContext } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Context from './data/Context';

const ProtectedRoutes = ({component,error}) => {
    const {data} = useContext(Context)
    const {bookId} = useParams()

    const signInPerson = localStorage.getItem('user')
    // const checkBook = data.books.find(({ id }) => id.toString() === bookId)

    if (!signInPerson){
        return <Navigate to='/'/>
    } else { 
        return component
    }
};

export default ProtectedRoutes;
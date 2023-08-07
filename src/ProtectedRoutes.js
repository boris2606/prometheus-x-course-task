import React, { useContext } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Context from './data/Context';

const ProtectedRoutes = ({component,error}) => {
    const {data} = useContext(Context)
    const {bookId} = useParams()

    const signInPerson = localStorage.getItem('user')
    
    if (!signInPerson){
        return <Navigate to='/'/>
    } else if ( bookId && !data.books.find(({ id }) => id.toString() === bookId)) {
        return error
    } else { 
        return component
    }
};

export default ProtectedRoutes;
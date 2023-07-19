import React from 'react';
import './Error.css'
import error from '../../img/error.svg'
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <section className='wrapper_error'>
            <div className='error_content_txt'>
                <p className='error_tit'>404</p>
                <img className='error_img' src={error} alt='Error'/>
            </div>
            <p className='error_sec_txt'>Oops, something went wrong</p>
            <Link className='return_btn' to='/'>Go to books</Link>
        </section>
    );
};

export default Error;
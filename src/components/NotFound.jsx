import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='notfound'>
            <h1 className='notfound__title'>I couldn't find this page</h1>
            <Link to='/' className='notfound__anchor'>
                Go back to the home page
            </Link>
        </div>
    );
};

export default NotFound;

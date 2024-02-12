import { useRouteError } from 'react-router-dom';

const Error = () => {
    const error = useRouteError();

    return (
        <div className='error' style={{ backgroundColor: '#f7fafc' }}>
            <h1 className='error__title'>Error: {error.message}</h1>
            <p className='error__status'>
                <strong>Status:</strong> {error.status} - {error.statusText}
            </p>
            {error.response && (
                <pre className='error__response'>
                    <strong>Response:</strong>{' '}
                    {JSON.stringify(error.response, null, 2)}
                </pre>
            )}
        </div>
    );
};

export default Error;

import {
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import React, { Suspense } from 'react';
import Layout from './components/Layout';
import Error from './components/Error';

const LazyNotFound = React.lazy(() => import('./components/NotFound'));
const LazyError = React.lazy(() => import('./components/Error'));

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Layout />} errorElement={<Error />}>
            <Route index element={<IndexPage />} />
            <Route
                path='*'
                element={
                    <Suspense fallback='Loading...'>
                        <LazyNotFound />
                    </Suspense>
                }
            />
        </Route>
    )
);

function App() {
    return <RouterProvider router={router} />;
}

export default App;

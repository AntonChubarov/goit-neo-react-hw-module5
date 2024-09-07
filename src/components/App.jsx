import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from './Navigation/Navigation.jsx';
import HomePage from '../pages/Home/Home.jsx';
import Loader from './Loader/Loader.jsx';

const MoviesPage = lazy(() => import('../pages/Movies/Movies.jsx'));
const MovieCast = lazy(() => import('./MovieCast/MovieCast.jsx'));
const NotFoundPage = lazy(() => import('../pages/NotFound/NotFound.jsx'));
const MovieDetailsPage = lazy(() => import('../pages/MovieDetails/MovieDetails.jsx'));
const MovieReviews = lazy(() => import('./MovieReviews/MovieReviews.jsx'));

import './App.css';

function App() {
    return (
        <div className="appContainer">
            <header className="header">
                <Navigation />
            </header>
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/movies" element={<MoviesPage />} />
                    <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
                        <Route path="cast" element={<MovieCast />} />
                        <Route path="reviews" element={<MovieReviews />} />
                    </Route>
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Suspense>
        </div>
    );
}

export default App;

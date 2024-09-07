import { lazy, useEffect, useState } from 'react';

import Loader from '../../components/Loader/Loader.jsx';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx';

const MovieList = lazy(() => import('../../components/MovieList/MovieList.jsx'));

import { getTrendingMovies } from '../../tmdb-api.js';

const HomePage = () => {
    const [moviesList, setMoviesList] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchTrendingMovies = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                const movies = await getTrendingMovies();
                setMoviesList(movies);
            } catch (error) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTrendingMovies();
    }, []);

    return (
        <div>
            <h1>Trending Today</h1>
            {isLoading && <Loader />}
            {isError && <ErrorMessage />}
            {moviesList.length > 0 && <MovieList items={moviesList} />}
        </div>
    );
};

export default HomePage;

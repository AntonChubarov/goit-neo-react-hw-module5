import { lazy, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader.jsx';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx';

import { getMoviesByQuery } from '../../tmdb-api.js';

import styles from './Movies.module.css';
import clsx from 'clsx';

const MovieList = lazy(() => import('../../components/MovieList/MovieList'));

const MoviesPage = () => {
    const [movieList, setMovieList] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [params, setParams] = useSearchParams();
    const query = params.get('query') ?? '';

    useEffect(() => {
        const fetchMovies = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                if (!query) {
                    setMovieList([]);
                    return;
                }
                const movies = await getMoviesByQuery(query);
                setMovieList(movies);
            } catch (error) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMovies();
    }, [query]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const query = e.target.query.value;
        if (!query) {
            return setParams({});
        }
        params.set('query', query);
        setParams(params);
        e.target.reset();
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.searchForm}>
                <input
                    type="text"
                    name="query"
                    className={styles.searchInput}
                    placeholder="Search movies by name"
                />
                <button className={clsx(styles.searchButton)} type="submit">
                    Search
                </button>
            </form>

            {query.length > 0 && <MovieList items={movieList} />}
            {isError && <ErrorMessage />}
            {isLoading && <Loader />}
        </div>
    );
};

export default MoviesPage;

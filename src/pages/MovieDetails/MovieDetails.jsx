import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';

import { getMovieDetails } from '../../tmdb-api.js';

import Loader from '../../components/Loader/Loader.jsx';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx';

const MovieDetails = lazy(() => import('../../components/MovieDetails/MovieDetails'));

// import styles from './MovieDetails.module.css';

const MovieDetailsPage = () => {
    const location = useLocation();
    const { movieId } = useParams();
    const backLinkHref = useRef(location.state?.from ?? '/movies');

    const [movieDetails, setMovieDetails] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                const movie = await getMovieDetails(movieId);
                setMovieDetails(movie);
            } catch (error) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovieDetails();
    }, [movieId]);

    return (
        <div>
            <Link to={backLinkHref.current}>
                Go Back
            </Link>
            {isLoading && <Loader />}
            {isError && <ErrorMessage />}
            {movieDetails && (
                <>
                    <MovieDetails movie={movieDetails} />
                    <div>
                        <h3>Additional Information</h3>
                        <ul>
                            <li>
                                <Link to={`/movies/${movieId}/cast`}>
                                    Cast
                                </Link>
                            </li>
                            <li>
                                <Link to={`/movies/${movieId}/reviews`}>
                                    Reviews
                                </Link>
                            </li>
                        </ul>
                    </div>
                </>
            )}
            <Suspense fallback={<Loader />}>
                <Outlet />
            </Suspense>
        </div>
    );
};

export default MovieDetailsPage;

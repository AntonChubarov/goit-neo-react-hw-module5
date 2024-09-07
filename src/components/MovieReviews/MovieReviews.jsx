import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Loader from '../Loader/Loader.jsx';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';

import { getMovieReviews } from '../../tmdb-api.js';

import styles from './MovieReviews.module.css';

const MovieReviews = () => {
    const { movieId } = useParams();

    const [movieReview, setMovieReview] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchMovieReviews = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                const reviews = await getMovieReviews(movieId);
                setMovieReview(reviews);
            } catch (error) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovieReviews();
    }, [movieId]);

    return (
        <div className={styles.reviewsContainer}>
            {isLoading && <Loader />}
            {isError && <ErrorMessage />}
            {movieReview.length > 0 ? (
                <ul className={styles.reviewsList}>
                    {movieReview.map((review) => (
                        <li key={review.id} className={styles.reviewItem}>
                            <h3 className={styles.author}>{review.author}</h3>
                            <p className={styles.content}>{review.content}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className={styles.noReviews}>We don't have any reviews for this movie.</p>
            )}
        </div>
    );
};

export default MovieReviews;

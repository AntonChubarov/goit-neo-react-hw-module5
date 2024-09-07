import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader.jsx';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';
import { getMovieCast } from '../../tmdb-api.js';
import styles from './MovieCast.module.css';

const MovieCast = () => {
    const { movieId } = useParams();

    const [movieCast, setMovieCast] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchMovieCast = async () => {
            setIsError(false);
            setIsLoading(true);

            try {
                const cast = await getMovieCast(movieId);
                setMovieCast(cast);
            } catch {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMovieCast();
    }, [movieId]);

    return (
        <div className={styles.castContainer}>
            {isLoading && <Loader />}
            {isError && <ErrorMessage message="Failed to load cast information." />}
            {movieCast.length > 0 ? (
                <ul className={styles.castList}>
                    {movieCast.map((actor) => (
                        <li key={actor.id} className={styles.castItem}>
                            <div className={styles.actorImageContainer}>
                                {actor.profile_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                                        alt={actor.name}
                                        className={styles.actorImage}
                                    />
                                ) : (
                                    <div className={styles.noProfilePhoto}></div>
                                )}
                            </div>
                            <p className={styles.actorName}>{actor.name}</p>
                            <p className={styles.actorCharacter}>Character: {actor.character}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className={styles.noCastMessage}>There is no cast info available.</p>
            )}
        </div>
    );
};

export default MovieCast;

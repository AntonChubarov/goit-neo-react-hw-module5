import styles from './MovieDetails.module.css';

const MovieDetails = ({ movie }) => {
    const genres = movie.genres.map((genre) => genre.name).join(', ');
    const score = Math.floor((Number(movie.vote_average) ?? 0) * 10);
    const releaseDate = movie.release_date ? `(${movie.release_date.slice(0, 4)})` : '';

    return (
        <div className={styles.detailsContainer}>
            <img
                className={styles.detailsImage}
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
            />
            <div className={styles.detailsInfo}>
                <h2 className={styles.title}>{`${movie.title} ${releaseDate}`}</h2>
                <span className={styles.userScore}>User Score: {score}%</span>
                <h3 className={styles.sectionHeading}>Overview</h3>
                <p className={styles.overview}>{movie.overview}</p>
                <h3 className={styles.sectionHeading}>Genres</h3>
                <p className={styles.genres}>{genres}</p>
            </div>
        </div>
    );
};

export default MovieDetails;

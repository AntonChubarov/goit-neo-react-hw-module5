import { Link, useLocation } from 'react-router-dom';
import styles from './MovieList.module.css';

const MovieList = ({ items }) => {
    const location = useLocation();

    return (
        <div className={styles.listContainer}>
            <ul className={styles.list}>
                {items &&
                    items.map(({ id, title }) => (
                        <li className={styles.listItem} key={id}>
                            <Link
                                to={`/movies/${id}`}
                                state={{ from: location }}
                                className={styles.link}
                            >
                                {title}
                            </Link>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default MovieList;

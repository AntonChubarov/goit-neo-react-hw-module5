import { RotatingLines } from 'react-loader-spinner';
import styles from './Loader.module.css';

const Loader = () => {
    return (
        <div className={styles.loaderContainer}>
            <RotatingLines
                strokeColor="#8257e5"
                strokeWidth="5"
                animationDuration="0.75"
                width="80"
                visible={true}
            />
        </div>
    );
};

export default Loader;

import styles from './ErrorMessage.module.css';

const ErrorMessage = ({ message = 'Something went wrong' }) => {
    return (
        <div className={styles.errorContainer}>
            <p className={styles.errorMessage}>{message}</p>
        </div>
    );
};

export default ErrorMessage;

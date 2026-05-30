import ErrorIcon from '../../assets/icons/triangle-exclamation-solid-full.svg?react';
import { NavLink } from 'react-router-dom';
import styles from './ErrorMessage.module.css';

export const ErrorMessage = ({ type }) => {
  let message = 'Something went wrong. Please try again later.';

  if (type === 'fetch') {
    message = 'Unable to load products right now.';
  }

  if (type === 'route') {
    message = 'Page not found.';
  }

  return (
    <div className={styles.container}>
      <ErrorIcon aria-hidden="true" className={styles.errorIcon} />
      <p className={styles.message}>{message}</p>
      <NavLink to="/" end className={styles.goHomeLink}>
        Go to homepage
      </NavLink>
    </div>
  );
};

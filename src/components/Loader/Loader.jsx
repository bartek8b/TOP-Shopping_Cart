import LoadingIcon from '../../assets/icons/arrows-spin-solid-full.svg?react';
import styles from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={styles.container}>
      <LoadingIcon
        aria-hidden="true"
        className={`info-icon ${styles.spinner}`}
      />
      <p className={styles.message}>Loading data...</p>
    </div>
  );
};

import ReactCountryFlag from 'react-country-flag';
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <div className={styles.container}>
      Made in{' '}
      <a
        href="https://en.wikipedia.org/wiki/Poland"
        target="_blank"
        rel="noopener noreferrer"
      >
        <ReactCountryFlag countryCode="PL" />
      </a>{' '}
      by{' '}
      <a
        href="https://github.com/bartek8b"
        target="_blank"
        rel="noopener"
        rel="noopener noreferrer"
      >
        Bartlomiej Balcerzak
      </a>
    </div>
  );
};

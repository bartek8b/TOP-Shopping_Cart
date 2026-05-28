import ReactCountryFlag from 'react-country-flag';
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer>
      Made in{' '}
      <a
        href="https://en.wikipedia.org/wiki/Poland"
        target="_blank"
        rel="noopener"
      >
        <ReactCountryFlag countryCode="PL" />
      </a>{' '}
      with ❤️ by{' '}
      <a href="https://github.com/bartek8b" target="_blank" rel="noopener">
        Bartlomiej Balcerzak
      </a>
    </footer>
  );
};

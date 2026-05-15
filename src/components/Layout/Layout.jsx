import { Nav } from '../Nav/Nav';

export function Layout({ children }) {
  return (
    <>
      <header>
        <Nav />
      </header>

      {children}
      
      <footer>Footer</footer>
    </>
  );
}

import { Outlet } from 'react-router-dom';
import { Nav } from '../Nav/Nav';

export const Layout = () => {
  return (
    <>
      <header>
        <Nav />
      </header>

      <main>
        <Outlet />
      </main>

      <footer>Footer</footer>
    </>
  );
}

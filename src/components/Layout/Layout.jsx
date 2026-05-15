import { Outlet } from 'react-router-dom';
import { Nav } from '../Nav/Nav';

export function Layout() {
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

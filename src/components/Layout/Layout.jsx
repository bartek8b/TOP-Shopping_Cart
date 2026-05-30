import { Outlet } from 'react-router-dom';
import { Nav } from '../Nav/Nav';
import { Footer } from '../Footer/Footer';

export const Layout = () => {
  return (
    <>
      <header>
        <Nav />
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

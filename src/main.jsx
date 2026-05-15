import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landing from './pages/Landing/Landing.jsx';
import Shop from './pages/Shop/Shop.jsx';
import Cart from './pages/Cart/Cart.jsx';
import 'modern-normalize/modern-normalize.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
    index: true,
    // errorElement: <ErrorPage />,
  },
  {
    path: "shop",
    element: <Shop />,
  },
    {
    path: "cart",
    element: <Cart />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

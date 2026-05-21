import 'modern-normalize/modern-normalize.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { CartProvider } from './components/CartProvider/CartProvider';
import { ErrorMessage } from './components/Error/Error';
import { Landing } from './pages/Landing/Landing';
import { Shop } from './pages/Shop/Shop';
import { Cart } from './pages/Cart/Cart';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorMessage type="route" />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'shop',
        element: <Shop />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>,
);

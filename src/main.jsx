import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landing from './components/Landing/Landing.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
    index: true,
    // errorElement: <ErrorPage />,
  },
  // {
  //   path: "profile",
  //   element: <Profile />,
  // },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

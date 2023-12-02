import { createBrowserRouter } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Main } from './Main';
import { NeverPage } from './NeverPage';
import { Form1 } from './Form1';
import { Form2 } from './Form2';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    children: [
      {
        path: '/',
        element: <Main />,
      },
      {
        path: '/form1',
        element: <Form1 />,
      },
      {
        path: '/form2',
        element: <Form2 />,
      },
      {
        path: '*',
        element: <NeverPage />,
      },
    ],
  },
]);

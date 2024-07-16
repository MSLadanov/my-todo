import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Contacts from './components/Contacts/Contacts';
import Todos from './components/Todos/Todos';
import UserPage from './components/UserPage/UserPage';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import Root from './components/Root/Root';

const router = createBrowserRouter([
  {
    path:'/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Navigate to="/todos" />,
      },
      {
        path:'contacts/',
        element: <Contacts />,
      },
      {
        path:'todos/',
        element: <Todos />,
      },
      {
        path:'user/',
        element: <UserPage />
      },
    ]
  },
  {
    path:'signin/',
    element: <SignIn />,
    errorElement: <ErrorPage />,
  },
  { 
    path:'signup/',
    element: <SignUp />,
    errorElement: <ErrorPage />,
  }
])


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

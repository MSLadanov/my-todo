import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Contacts from './components/Contacts/Contacts';
import Todos from './components/Todos/Todos';
import UserPage from './components/UserPage/UserPage';
import SignUp from './components/SignUp/SignUp';

const router = createBrowserRouter([
  {
    path:'/',
    element: <App />,
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
      {
        path: "signup/",
        element: <SignUp />,
      },
    ]
  },
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

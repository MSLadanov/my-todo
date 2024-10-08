import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Contacts from './components/Contacts/Contacts';
import Todos from './components/Todos/Todos';
import UserPage from './components/UserPage/UserPage';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import Root from './components/Root/Root';
import TodoLists from './components/TodoLists/TodoLists';
import Contact from './components/Contact/Contact';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AddTodoList from './components/AddTodoList/AddTodoList';
import Chats from './components/Chats/Chats';
import Chat from './components/Chat/Chat';

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path:'/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Navigate to="/todolists" />,
      },
      {
        path: 'contacts/',
        element: <Contacts />
      },
      {
        path:'contacts/:contactId',
        element: <Contact />,
      },
      {
        path:'todolists/',
        element: <TodoLists />,
      },
      {
        path:'todolists/:todoListId',
        element: <Todos />,
      },
      {
        path:'chats/',
        element: <Chats />,
      },
      {
        path:'chats/:chatId',
        element: <Chat />,
      },
      {
        path:'user/',
        element: <UserPage />
      },
      {
        path:'addtodolist/',
        element: <AddTodoList />
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
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default queryClient
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

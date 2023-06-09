import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { store } from './store/store';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import Applications from './pages/applications';
import ToDoList, {loader as todoListLoader, action as todoAction, todoDelete} from './pages/todolist';
import Details, {loader as detailLoader, 
                action as updateDetailAction
                } from './components/details';
import CardGrid, {loader as cardLoader, action as addNewConpanyAction} from './components/cardgrid';
import {action as stateUpdateAction} from "./components/card"
import ErrorPage from './error-page';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "applications/:user/",
        element: <Applications />,
        children: [
          {
            index: true,
            element: <CardGrid />,
            loader: cardLoader
          },
          {
            path: "add/",
            action: addNewConpanyAction
          },
          {
            path: "stateupdate/",
            action: stateUpdateAction
          },
          {
            path: "details/:id/",
            element: <Details />,
            loader: detailLoader,
          },
          {
            path: "details/:id/update/",
            action: updateDetailAction
          },
        ]
      },
      {
        path: "applications/:user/new-applications",
      },
      {
        path: ":user/todolist/",
        element: <ToDoList />,
        loader: todoListLoader,
      },
      {
        path: ":user/todolist/add",
        action: todoAction,
      },
      {
        path: ":user/todolist/delete/:id",
        action: todoDelete,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);


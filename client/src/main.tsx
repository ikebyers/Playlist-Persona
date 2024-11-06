import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import './index.css';
import React from "react";

import App from './App.tsx';

import ErrorPage from '../../src/pages/ErrorPage.tsx';
import HomePage from '../../src/pages/HomePage.tsx';
import LoginPage from '../../src/pages/LoginPage.tsx';
import ProfilePage from '../../src/pages/ProfilePage.tsx';
import CurrentPlaylistPage from '../../src/pages/CurrentPlaylistPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {path: '/', element: <LoginPage/>},
      {path: '/home', element: <HomePage/>},
      {path: '/profile', element: <ProfilePage/>},
      {path: '/error', element: <ErrorPage/>},
      {path: '/currentPlaylist', element: <CurrentPlaylistPage/>}
    ]
  }
])

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  );
}

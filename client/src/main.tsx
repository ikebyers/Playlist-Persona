import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import './index.css';
import React from "react";

import App from './App.tsx';

import ErrorPage from './pages/ErrorPage.tsx';
import HomePage from './pages/HomePage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import ProfilePage from './pages/ProfilePage.tsx';
import CurrentPlaylistPage from './pages/CurrentPlaylistPage.tsx';

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
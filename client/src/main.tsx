import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import './main.css';
import './i18n.ts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    <App />
  </React.StrictMode>
);

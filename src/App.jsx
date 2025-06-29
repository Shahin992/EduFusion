import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './routes/Router';
import './index.css';
import Utils from './Utils/Utils';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

const cache = createCache({
  key: 'prfl' + Utils.generateRandomString(5),
  prepend: true,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <CacheProvider value={cache}>
    <RouterProvider router={router} />
    </CacheProvider>
  </React.StrictMode>
);

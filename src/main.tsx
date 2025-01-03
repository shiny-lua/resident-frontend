import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
import { ToastContainer } from 'react-toastify';

import App from './app';
import './index.css';
// import 'jsvectormap/dist/css/jsvectormap.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <Router>
      <App />
      <ToastContainer />
    </Router>
  // </React.StrictMode>,
);

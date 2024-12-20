import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './app';
import './index.css';
// import 'jsvectormap/dist/css/jsvectormap.css';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <Router>
      <App />
      <ToastContainer />
    </Router>
  // </React.StrictMode>,
);

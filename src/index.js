import React from 'react';
import { HashRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'; // Import createRoot from 'react-dom/client'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create a root for ReactDOM
const root = createRoot(document.getElementById('root'));

// Render the App component wrapped in BrowserRouter
root.render(
    <HashRouter>
        <App />
    </HashRouter>
);

// Report web vitals
reportWebVitals();

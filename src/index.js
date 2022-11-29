import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './views/App';
import App2 from './views/App2';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        {/* <App /> */}
        <App2 />
    </React.StrictMode>
);
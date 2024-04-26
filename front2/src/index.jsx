import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import { StyleSheetManager } from 'styled-components';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
    <StyleSheetManager shouldForwardProp={() => true}>
        <App />
    </StyleSheetManager>,
);
reportWebVitals();

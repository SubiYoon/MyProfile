import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import { StyleSheetManager } from 'styled-components';
import ReactModal from 'react-modal';

const root = ReactDOM.createRoot(document.getElementById('app'));
ReactModal.setAppElement('#app'); // 루트 요소 설정
root.render(
    <StyleSheetManager shouldForwardProp={() => true}>
        <App />
    </StyleSheetManager>,
);
reportWebVitals();

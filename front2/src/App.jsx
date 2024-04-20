import React from 'react';
import './App.css';
import { RecoilRoot } from 'recoil';
import { styled, createGlobalStyle } from 'styled-components';
import Main from '@/pages/Main.jsx';
import Error from '@/pages/Error.jsx'; // Error 컴포넌트를 임포트합니다.
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Router와 Routes를 가져옵니다.

const GlobalStyle = createGlobalStyle`
    html, body {
        overflow-y: hidden;
        min-height: 800px;
        min-width: 1600px;
    }
`;

function App() {
    return (
        <BrowserRouter>
            <RecoilRoot>
                <GlobalStyle />
                <Routes>
                    <Route path="/:urlGb" element={<Main />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </RecoilRoot>
        </BrowserRouter>
    );
}

export default App;

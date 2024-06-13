import React from 'react';
import './App.css';
import { RecoilRoot } from 'recoil';
import { ThemeProvider, createGlobalStyle, styled } from 'styled-components';
import Main from '@/pages/Main.jsx';
import Error from '@/pages/Error.jsx'; // Error 컴포넌트를 임포트합니다.
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Router와 Routes를 가져옵니다.
import theme from '@/theme.js';
import { useEffect, useRef } from 'react';
import Project from '@/pages/Project.jsx';
import Education from '@/pages/Education.jsx';

const GlobalStyle = createGlobalStyle`
    html, body {
        min-width: 1800px;
        overflow-y: hidden;
    }
    @media screen and (max-width: 768px) {
        html, body {
            min-width: auto;
        }
`;

function App() {
    return (
        <BrowserRouter>
            <RecoilRoot>
                <ThemeProvider theme={theme}>
                    <GlobalStyle />
                    <Routes>
                        <Route path="/:urlGb" element={<Main />} />
                        <Route path="*" element={<Error />} />
                    </Routes>
                </ThemeProvider>
            </RecoilRoot>
        </BrowserRouter>
    );
}

export default App;

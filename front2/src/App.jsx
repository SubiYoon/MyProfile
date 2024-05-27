import React from 'react';
import './App.css';
import { RecoilRoot } from 'recoil';
import { ThemeProvider, createGlobalStyle, styled } from 'styled-components';
import Main from '@/pages/Main.jsx';
import Error from '@/pages/Error.jsx'; // Error 컴포넌트를 임포트합니다.
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Router와 Routes를 가져옵니다.
import theme from '@/theme.js';
import { useEffect, useRef } from 'react';

const GlobalStyle = createGlobalStyle`
    html, body {
        min-width: 1800px;
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

const Video = styled.video`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    object-fit: cover;
`;

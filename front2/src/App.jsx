import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import { RecoilRoot } from 'recoil';
import { styled, createGlobalStyle } from 'styled-components';
import Main from '@/pages/Main.jsx';

const GlobalStyle = createGlobalStyle`
    html, body {
        overflow-y: hidden;
        //overflow-x: auto;
        //최소값 설정
        min-height: 800px;
        min-width: 1600px;
    }
    
    @font-face {
        font-family: "mainFont2";
        font-weight: 50;
        src: url("/assets/font/mainFont2.ttf") format("truetype");
    }
    @font-face {
        font-family: "mainFont";
        font-weight: 50;
        src: url("/assets/font/mainFont.ttf") format("truetype");
    }
`;

function App() {
    return (
        <RecoilRoot>
            <GlobalStyle />
            <Video autoPlay loop muted>
                <source src="/assets/videos/main.mp4" type="video/mp4" />
            </Video>
            <Main />
        </RecoilRoot>
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

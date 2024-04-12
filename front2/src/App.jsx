import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import { RecoilRoot } from 'recoil';
import { styled, createGlobalStyle } from 'styled-components';
import axios from 'axios';
import { useCurrentPage } from './recoil.js';
import Main from '@/pages/Main.jsx';

const GlobalStyle = createGlobalStyle`
    html, body {
        overflow-y: hidden;
    }
    @media screen and (max-width: 768px) {
        html, body {
            min-height: 400px;
            min-width: 300px;
        }
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
    // const [data, setData] = useState(null);
    // const testOnClick = async () => {
    //     try {
    //         const response = await axios.get('/main');
    //         setData(response.data);
    //     } catch (error) {
    //         alert('에러');
    //     }
    // };

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

import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import Header from './components/layout/Header.jsx';
import { RecoilRoot } from 'recoil';
import { styled, createGlobalStyle } from 'styled-components';
import axios from 'axios';
import Dot from '@/components/layout/Dot.jsx';

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
  const DIVIDER_HEIGHT = 5;
  const outerDivRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [data, setData] = useState(null);
  const testOnClick = async () => {
    try {
      const response = await axios.get('/main');
      // NAME 속성의 값을 출력
      setData(response.data);
    } catch (error) {
      alert('에러');
    }
  };

  useEffect(() => {
    const wheelHandler = (e) => {
      e.preventDefault();
      const { deltaY } = e;
      const { scrollTop } = outerDivRef.current;
      const pageHeight = window.innerHeight;

      let nextPage = currentPage;
      if (deltaY > 0) {
        nextPage = Math.min(currentPage + 1, 3);
      } else {
        nextPage = Math.max(currentPage - 1, 1);
      }

      const scrollToTop = (page) => {
        outerDivRef.current.scrollTo({
          top: (page - 1) * pageHeight + (page - 1) * DIVIDER_HEIGHT,
          left: 0,
          behavior: 'smooth',
        });
      };

      setCurrentPage(nextPage);
      scrollToTop(nextPage);
    };

    const outerDivRefCurrent = outerDivRef.current;
    outerDivRefCurrent.addEventListener('wheel', wheelHandler, {
      passive: false,
    });
    return () => {
      outerDivRefCurrent.removeEventListener('wheel', wheelHandler);
    };
  }, [currentPage]);

  return (
    <RecoilRoot>
      <GlobalStyle />
      <Video autoPlay loop muted>
        <source src="/assets/videos/main.mp4" type="video/mp4" />
      </Video>
      <Wrapper ref={outerDivRef}>
        <Header />
        <Section>
          <Overlay>
            <MainFont>Yoon Dong Sub</MainFont>
            <MainFont2>Park Ji Su</MainFont2>
            <MainFont3>PROJECT</MainFont3>
          </Overlay>
        </Section>
        <Section>
          <Introduction>
            <button onClick={testOnClick}>클릭</button>
            <p>{JSON.stringify(data)}</p>
          </Introduction>
        </Section>
        <Section>
          <Introduction>Page 3</Introduction>
        </Section>
        <Dot currentpage={currentPage} />
      </Wrapper>
    </RecoilRoot>
  );
}

export default App;

const Wrapper = styled.div`
  overflow-y: hidden;
  height: 100vh;
`;

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: white;
  position: relative;
`;

const Video = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  object-fit: cover;
`;

const Introduction = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  width: 90%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #3b5bdb;
  pointer-events: none;
  flex-direction: column;
  text-shadow: 8px 8px 8px black;
`;

const MainFont = styled.div`
  width: 100%;
  font-family: 'mainFont2';
  font-weight: bolder;
  font-size: 8rem;
  text-align: left;
`;

const MainFont2 = styled.div`
  width: 100%;
  font-family: 'mainFont2';
  font-weight: bolder;
  font-size: 8rem;
  text-align: center;
`;

const MainFont3 = styled.div`
  width: 100%;
  font-weight: bolder;
  color: #364fc7;
  font-size: 10rem;
  font-family: 'mainFont';
  text-align: right;
`;

import React, { useRef, useEffect, useState } from "react";
import './App.css';
import Header from "./components/layout/Header.jsx";
import { RecoilRoot } from "recoil";
import { styled, createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    html, body {
        overflow-y: hidden;
        //min-height: 600px; /* 최소 높이 */
        //min-width: 800px; /* 최소 넓이 */
        
    }
    @media screen and (max-width: 768px) {
        html, body {
            min-height: 400px; /* 모바일 최소 높이 */
            min-width: 300px; /* 모바일 최소 넓이 */
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
                    behavior: "smooth",
                });
            };

            setCurrentPage(nextPage);
            scrollToTop(nextPage);
        };

        const outerDivRefCurrent = outerDivRef.current;
        outerDivRefCurrent.addEventListener("wheel", wheelHandler);
        return () => {
            outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
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
                    <Introduction>Page 2</Introduction>
                </Section>
                <Section>
                    <Introduction>Page 3</Introduction>
                </Section>
                <DotContainer>
                    <DotBox>
                        <Dot currentPage={currentPage} num={1} />
                        <Dot currentPage={currentPage} num={2} />
                        <Dot currentPage={currentPage} num={3} />
                    </DotBox>
                </DotContainer>
            </Wrapper>
        </RecoilRoot>
    );
}

export default App;

const Wrapper = styled.div`
    overflow-y: hidden; // 스크롤바 숨김
    height: 100vh; // 컨테이너의 높이를 뷰포트 높이로 설정
`;

const Section = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%; // 각 섹션의 높이는 뷰포트 높이와 동일
    color: white;
    position: relative; // Overlay를 올려놓기 위해 부모 요소에 position: relative; 추가
`;

const Video = styled.video`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1; // 페이지 컨텐츠 위에 표시되도록 설정
    object-fit: cover;
`;

const Introduction = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const DotContainer = styled.div`
    position: fixed;
    top: 45%;
    right: 24px;
`;

const DotBox = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    width: 20px;
    height: 100px;
`;

const Dot = styled.div`
    width: 10px;
    height: 10px;
    border: 4px solid black;
    border-radius: 999px;
    background-color: ${({ currentPage, num }) => (currentPage === num ? "black" : "transparent")};
    transition-duration: 1000px;
    transition: background-color 0.5s;
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
    pointer-events: none; // Overlay 위에서 마우스 이벤트를 무시하도록 설정
    flex-direction: column;
    text-shadow: 8px 8px 8px black;
   
`;

const MainFont = styled.div`
    width: 100%;
    font-family: "mainFont2";
    font-weight: bolder;
    font-size: 8rem;
    text-align: left;
`

const MainFont2 = styled.div`
    width: 100%;
    font-family: "mainFont2";
    font-weight: bolder;
    font-size: 8rem;
    text-align: center;
`

const MainFont3 = styled.div`
    width: 100%;
    font-weight: bolder;
    color: #364fc7;
    font-size: 10rem;
    font-family: "mainFont";
    text-align: right;
`
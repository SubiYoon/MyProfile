import React, { useRef, useEffect, useState } from "react";
import './App.css';
import Header from "./components/layout/Header.jsx";
import { RecoilRoot } from "recoil";
import styled from "styled-components";

function App() {
    const DIVIDER_HEIGHT = 5;
    const outerDivRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        const wheelHandler = (e) => {
            e.preventDefault();
            const { deltaY } = e;
            const { scrollTop } = outerDivRef.current; // 스크롤 위쪽 끝부분 위치
            const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.

            if (deltaY > 0) {
                // 스크롤 내릴 때
                if (scrollTop >= 0 && scrollTop < pageHeight) {
                    //현재 1페이지
                    outerDivRef.current.scrollTo({
                        top: pageHeight + DIVIDER_HEIGHT,
                        left: 0,
                        behavior: "smooth",
                    });
                    setCurrentPage(2);
                } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
                    //현재 2페이지
                    outerDivRef.current.scrollTo({
                        top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
                        left: 0,
                        behavior: "smooth",
                    });
                    setCurrentPage(3);
                } else {
                    // 현재 3페이지
                    outerDivRef.current.scrollTo({
                        top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
                        left: 0,
                        behavior: "smooth",
                    });
                }
            } else {
                // 스크롤 올릴 때
                if (scrollTop >= 0 && scrollTop < pageHeight) {
                    //현재 1페이지
                    outerDivRef.current.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                    });
                } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
                    //현재 2페이지
                    outerDivRef.current.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                    });
                    setCurrentPage(1);
                } else {
                    // 현재 3페이지
                    outerDivRef.current.scrollTo({
                        top: pageHeight + DIVIDER_HEIGHT,
                        left: 0,
                        behavior: "smooth",
                    });
                    setCurrentPage(2);
                }
            }
        };
        const outerDivRefCurrent = outerDivRef.current;
        outerDivRefCurrent.addEventListener("wheel", wheelHandler);
        return () => {
            outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
        };
    }, []);

    return (
        <RecoilRoot>
            <Wrapper ref={outerDivRef}>
                <Header />
                <DotContainer>
                    <DotBox>
                        <Dot currentPage={currentPage} num={1}/>
                        <Dot currentPage={currentPage} num={2}/>
                        <Dot currentPage={currentPage} num={3}/>
                    </DotBox>
                </DotContainer>
                <Section>
                    <Video autoPlay loop muted>
                        <source src="/assets/videos/main.mp4" type="video/mp4" />
                    </Video>
                </Section>
                <Section>
                    <Introduction>Page 2</Introduction>
                </Section>
                <Section>
                    <Introduction>Page 3</Introduction>
                </Section>
            </Wrapper>
        </RecoilRoot>
    );
}

export default App;

const Wrapper = styled.div`
    overflow-y: hidden; // 스크롤바 숨김
    height: 100vh; // 컨테이너의 높이를 뷰포트 높이로 설정
    //min-height: 800px;
    min-width: 1180px;
`;

const Section = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%; // 각 섹션의 높이는 뷰포트 높이와 동일
    background-color: gray;
    color: white;
    ::-webkit-scrollbar {
        display: none;
`;

const Video = styled.video`
    width: 100%;
    height: 100%;
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

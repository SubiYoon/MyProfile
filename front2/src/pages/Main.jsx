import React, { useEffect, useRef } from 'react';
import { currentPageState } from '../recoil.js';
import Header from '@/components/layout/Header.jsx';
import Profile from '@/pages/Profile.jsx';
import Dot from '@/components/layout/Dot.jsx';
import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';
import Histroy from '@/pages/History.jsx';

const Main = () => {
    const outerDivRef = useRef(null);
    const sectionRefs = [useRef(null), useRef(null), useRef(null)];
    const [currentPage, setCurrentPage] = useRecoilState(currentPageState);

    useEffect(() => {
        const scrollHandler = () => {
            const { scrollTop, scrollHeight, clientHeight } =
                outerDivRef.current;
            const scrollFraction = scrollTop / (scrollHeight - clientHeight);
            const totalPages = 3; // 전체 페이지 수
            const newPage = Math.ceil(scrollFraction * totalPages);
            if (newPage !== currentPage) {
                setCurrentPage(newPage);
            }
        };

        const outerDivRefCurrent = outerDivRef.current;
        outerDivRefCurrent.addEventListener('scroll', scrollHandler);
        return () => {
            outerDivRefCurrent.removeEventListener('scroll', scrollHandler);
        };
    }, [currentPage, setCurrentPage]);

    const handleMenuClick = (page) => {
        setCurrentPage(page);
        sectionRefs[page - 1].current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <Wrapper ref={outerDivRef}>
            <Header onMenuClick={handleMenuClick} />
            <Section ref={sectionRefs[0]}>
                <Overlay>
                    <MainFont>Yoon Dong Sub</MainFont>
                    <MainFont2>Park Ji Su</MainFont2>
                    <MainFont3>PROJECT</MainFont3>
                </Overlay>
            </Section>
            <Section ref={sectionRefs[1]}>
                <Introduction>
                    <Profile />
                </Introduction>
            </Section>
            <Section ref={sectionRefs[2]}>
                <Introduction>
                    <Histroy />
                </Introduction>
            </Section>
            <Dot currentpage={currentPage} />
        </Wrapper>
    );
};

export default Main;

const Wrapper = styled.div`
    overflow-y: auto;
    height: 100vh;
`;

const Section = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    color: white;
    position: relative;
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

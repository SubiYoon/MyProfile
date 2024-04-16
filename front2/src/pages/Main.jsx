import React, { useEffect, useRef } from 'react';
import { currentPageState, userState } from '../recoil.js';
import Profile from '@/pages/Profile.jsx';
import Dot from '@/components/layout/Dot.jsx';
import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';
import Histroy from '@/pages/History.jsx';

const Main = () => {
    const outerDivRef = useRef(null);
    const sectionRefs = [useRef(null), useRef(null), useRef(null)];
    const [currentPage, setCurrentPage] = useRecoilState(currentPageState);

    //url로 유저 받아오기 ABCD, parkjs를 붙여야함
    const [userGb, setUserGb] = useRecoilState(userState);
    const url = document.location.href;
    const urlGb = url.split('/')[3];

    //url 상태 확인
    useEffect(() => {
        setUserGb(urlGb);
    }, [userGb]);

    useEffect(() => {
        const scrollHandler = () => {
            const { scrollTop, scrollHeight, clientHeight } =
                outerDivRef.current;
            const scrollFraction = scrollTop / (scrollHeight - clientHeight);
            const totalPages = 3; // 전체 페이지 수
            let newPage;

            if (scrollTop === 0) {
                newPage = 1; // 맨 위에 있을 때는 항상 1페이지로 인식
            } else {
                newPage = Math.ceil(scrollFraction * totalPages);
            }

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
            <Section ref={sectionRefs[0]}>
                <Overlay $currentPage={currentPage}>
                    <MainFont>Yoon Dong Sub</MainFont>
                    <MainFont2>Park Ji Su</MainFont2>
                    <MainFont3>PROJECT</MainFont3>
                </Overlay>
            </Section>
            <Section ref={sectionRefs[1]}>
                <SectionBox>{userGb !== null ? <Profile /> : null}</SectionBox>
            </Section>
            <Section ref={sectionRefs[2]}>
                <SectionBox>
                    <Histroy />
                </SectionBox>
            </Section>
            <Dot onMenuClick={handleMenuClick} />
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
    min-height: 800px;
`;

const SectionBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 90%;
`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    width: 84%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #3b5bdb;
    pointer-events: none;
    flex-direction: column;
    text-shadow: 8px 8px 8px black;
    transform: translateX(
        ${({ $currentPage }) => ($currentPage === 1 ? '0' : '-100vw')}
    );
    transition: transform 1s ease;
`;

const MainFont = styled.div`
    width: 100%;
    font-family: 'mainFont2';
    font-weight: bolder;
    font-size: 180px;
    text-align: left;
`;

const MainFont2 = styled.div`
    width: 100%;
    font-family: 'mainFont2';
    font-weight: bolder;
    font-size: 180px;
    text-align: center;
    margin-top: 60px;
`;

const MainFont3 = styled.div`
    width: 100%;
    margin-top: 60px;
    font-weight: bolder;
    color: #364fc7;
    font-size: 200px;
    font-family: 'mainFont';
    text-align: right;
`;

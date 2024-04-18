import React, { useEffect, useRef } from 'react';
import { currentPageState, userState } from '../recoil.js';
import Profile from '@/pages/Profile.jsx';
import Dot from '@/components/layout/Dot.jsx';
import Error from '@/pages/Error.jsx';
import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';
import Histroy from '@/pages/History.jsx';
import { useParams } from 'react-router-dom';

const Main = () => {
    const outerDivRef = useRef(null);
    const sectionRefs = [useRef(null), useRef(null), useRef(null)];
    const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
    //url로 유저 받아오기 ABCD, parkjs를 붙여야함
    const [userGb, setUserGb] = useRecoilState(userState);

    const { urlGb } = useParams();

    console.log('파람', urlGb);

    //url 상태 확인
    useEffect(() => {
        setUserGb(urlGb);
    }, [urlGb]); // userGb 대신에 urlGb를 의존성으로 설정해야 합니다.

    useEffect(() => {
        const scrollHandler = () => {
            if (!outerDivRef.current) return; // outerDivRef.current가 null인 경우에 대한 예외처리 추가
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
        if (!outerDivRefCurrent) return; // outerDivRef.current가 null인 경우에 대한 예외처리 추가
        outerDivRefCurrent.addEventListener('scroll', scrollHandler);
        return () => {
            outerDivRefCurrent.removeEventListener('scroll', scrollHandler);
        };
    }, [currentPage, setCurrentPage]); // 외부 의존성 배열에 currentPage와 setCurrentPage 추가

    const handleMenuClick = (page) => {
        setCurrentPage(page);
        sectionRefs[page - 1].current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            {urlGb === 'parkjs' || urlGb === 'ABCD' ? (
                <>
                    <Video autoPlay loop muted>
                        <source
                            src="/assets/videos/main.mp4"
                            type="video/mp4"
                        />
                    </Video>
                    <Wrapper ref={outerDivRef}>
                        <Section ref={sectionRefs[0]}>
                            <Overlay $currentPage={currentPage}>
                                <MainFont>Yoon Dong Sub</MainFont>
                                <MainFont2>Park Ji Su</MainFont2>
                                <MainFont3>PROJECT</MainFont3>
                            </Overlay>
                        </Section>
                        <Section ref={sectionRefs[1]}>
                            <SectionBox>
                                {userGb !== null ? <Profile /> : null}
                            </SectionBox>
                        </Section>
                        <Section ref={sectionRefs[2]}>
                            <SectionBox>
                                <Histroy />
                            </SectionBox>
                        </Section>
                        <Dot onMenuClick={handleMenuClick} />
                    </Wrapper>
                </>
            ) : (
                <Error />
            )}
        </>
    );
};

export default Main;

const Video = styled.video`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    object-fit: cover;
`;

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

import React, { useEffect, useRef, useState } from 'react';
import { currentPageState, userState } from '../recoil.js';
import Profile from '@/pages/Profile.jsx';
import Dot from '@/components/layout/Dot.jsx';
import Error from '@/pages/Error.jsx';
import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';
import Project from '@/pages/Project.jsx';
import { useParams } from 'react-router-dom';
import Skills from '@/pages/Skills.jsx';

const Main = () => {
    const outerDivRef = useRef(null);
    const sectionRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
    ];
    const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
    const [userGb, setUserGb] = useRecoilState(userState);
    const { urlGb } = useParams();

    const [typedText, setTypedText] = useState('');
    const [textIndex, setTextIndex] = useState(0);
    const [subTextTyped, setSubTextTyped] = useState(false);

    //메인 화면 이름 구분
    const mainTextToType = userGb === 'ABCD' ? 'Yoon Dong Sub' : 'Park Ji Su';

    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.playbackRate = 0.8; //비디오 재생속도
        }
    }, []);

    useEffect(() => {
        setUserGb(urlGb);
    }, [urlGb]);

    useEffect(() => {
        const scrollHandler = () => {
            if (!outerDivRef.current) return;
            const { scrollTop, scrollHeight, clientHeight } =
                outerDivRef.current;
            const scrollFraction = scrollTop / (scrollHeight - clientHeight);
            //총 페이지 수 구분
            const totalPages = 4;
            let newPage;

            if (scrollTop === 0) {
                newPage = 1;
            } else {
                newPage = Math.ceil(scrollFraction * totalPages);
            }

            if (newPage !== currentPage) {
                setCurrentPage(newPage);
            }
        };

        const outerDivRefCurrent = outerDivRef.current;
        if (!outerDivRefCurrent) return;
        outerDivRefCurrent.addEventListener('scroll', scrollHandler);
        return () => {
            outerDivRefCurrent.removeEventListener('scroll', scrollHandler);
        };
    }, [currentPage, setCurrentPage]);

    const handleMenuClick = (page) => {
        setCurrentPage(page);
        sectionRefs[page - 1].current.scrollIntoView({ behavior: 'smooth' });
    };

    //텍스트 타이핑 효과
    useEffect(() => {
        const mainTextTypingTimer = setTimeout(() => {
            if (textIndex < mainTextToType.length) {
                setTypedText(mainTextToType.substring(0, textIndex + 1));
                setTextIndex((prevIndex) => prevIndex + 1);
            }
            // mainTextTypingTimer가 끝난 후 subText가 나오게 설정
            else {
                const subTextTypingTimer = setTimeout(() => {
                    setSubTextTyped(true);
                }, 90);
            }
        }, 160);

        return () => clearTimeout(mainTextTypingTimer);
    }, [textIndex, mainTextToType]);

    return (
        <>
            {urlGb === 'parkjs' || urlGb === 'ABCD' ? (
                <>
                    <Video ref={videoRef} autoPlay loop muted>
                        <source
                            src="/assets/videos/galaxy.mp4"
                            type="video/mp4"
                        />
                    </Video>
                    <Wrapper ref={outerDivRef}>
                        <Section ref={sectionRefs[0]}>
                            <Overlay $currentPage={currentPage}>
                                <MainText>{typedText}</MainText>
                                <MainText2 $subTextTyped={subTextTyped}>
                                    PORTFOLIO
                                </MainText2>
                            </Overlay>
                        </Section>
                        <Section ref={sectionRefs[1]}>
                            <SectionBox>
                                {userGb !== null ? <Profile /> : null}
                            </SectionBox>
                        </Section>
                        <Section ref={sectionRefs[2]}>
                            <SectionBox>
                                <Skills />
                            </SectionBox>
                        </Section>
                        <Section ref={sectionRefs[3]}>
                            <SectionBox>
                                <Project />
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
    min-height: 100vh;
    color: white;
    position: relative;
`;

const SectionBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;
`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    width: 84%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    flex-direction: column;
    text-shadow: 8px 8px 8px black;
    transform: translateX(
        ${({ $currentPage }) => ($currentPage === 1 ? '0' : '-100vw')}
    );
    transition: transform 1s ease;
`;

const MainText = styled.div`
    width: 100%;
    font-family: 'mainFont';
    font-weight: bolder;
    font-size: 200px;
    text-align: left;
`;

const MainText2 = styled.div`
    width: 100%;
    margin-top: 60px;
    font-weight: bolder;
    font-size: 200px;
    font-family: 'mainFont';
    text-align: right;
    transition: transform 1s ease;
    transform: translateX(
        ${({ $subTextTyped }) => ($subTextTyped ? '0' : '-100vw')}
    );
`;

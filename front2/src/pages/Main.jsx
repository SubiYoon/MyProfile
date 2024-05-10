import React, { useEffect, useRef, useState } from 'react';
import {
    apiState,
    currentPageState,
    profileState,
    stackState,
} from '../recoil.js';
import Profile from '@/pages/Profile.jsx';
import Dot from '@/components/layout/Dot.jsx';
import Error from '@/pages/Error.jsx';
import { styled } from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import Project from '@/pages/Project.jsx';
import { useParams } from 'react-router-dom';
import Skills from '@/pages/Skills.jsx';
import Header from '@/pages/Header.jsx';
import axiosInstance from '../../axiosInstance.js';

const Main = () => {
    const outerDivRef = useRef(null);
    const sectionRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
    ];
    const [currentPage, setCurrentPage] = useRecoilState(currentPageState);

    const [profileData, setProfileData] = useRecoilState(profileState);
    const [stackData, setStackData] = useRecoilState(stackState);

    const [apiData, setApiData] = useRecoilState(apiState);

    const { urlGb } = useParams();
    const text = urlGb === 'ABCD' ? 'Yoon Dong Sub' : 'Park Ji Su';

    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.playbackRate = 0.8; //비디오 재생속도
        }
    }, []);

    useEffect(() => {
        setApiData(import.meta.env.VITE_API_STATIC_URL);

        const fetchProfileData = async () => {
            try {
                const response = await axiosInstance.get(`api/name/${urlGb}`);
                setProfileData(response.data.profile);
                setStackData(response.data.stack);
            } catch (error) {
                console.error('Error fetching menu data:', error);
                setProfileData(null);
                setStackData(null);
            }
        };
        fetchProfileData();
    }, []);

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
    }, [currentPage, setCurrentPage, profileData]);

    const handleMenuClick = (page) => {
        setCurrentPage(page);
        sectionRefs[page - 1].current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            {profileData === null ? (
                <Error />
            ) : (
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
                                <Header text={text} gb={'main'} />
                            </Overlay>
                        </Section>
                        <Section ref={sectionRefs[1]}>
                            <SectionBox>
                                <Profile />
                            </SectionBox>
                        </Section>
                        <Section ref={sectionRefs[2]}>
                            <SectionBox>
                                <Skills />
                            </SectionBox>
                        </Section>
                        <Section ref={sectionRefs[3]}>
                            <SectionBox>
                                <Project userGb={urlGb} />
                            </SectionBox>
                        </Section>
                        <Dot onMenuClick={handleMenuClick} />
                    </Wrapper>
                </>
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
    width: 90%;
    display: flex;
    height: auto;
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

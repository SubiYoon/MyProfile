import React from 'react';
import { useRecoilState } from 'recoil';
import { currentPageState, userState, stackState } from '@/recoil.js';
import { styled } from 'styled-components';

const Project = () => {
    const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
    return (
        <>
            <SideSpacer $currentPage={currentPage} />
            <ProjectWrapper $currentPage={currentPage}>
                <HeaderContainer>
                    <HeaderText>PROJECTS</HeaderText>
                </HeaderContainer>
                <ProjectContainer></ProjectContainer>
            </ProjectWrapper>
            <SideSpacer $currentPage={currentPage} />
        </>
    );
};

export default Project;

const ProjectWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.92);
    font-family: 'profileFont';
    transition:
        transform 0.6s ease,
        opacity 0.6s ease;
    transform-style: preserve-3d;
    transform: ${({ $currentPage }) =>
        $currentPage === 4 ? 'rotateY(0deg)' : 'rotateY(90deg)'};
`;

const HeaderContainer = styled.div`
    height: 10%;
    min-height: 140px;
    background-color: rgba(0, 0, 0, 0.8);
    text-align: center;
    padding-top: 24px;
`;

const ProjectContainer = styled.div`
    height: 90%;
    min-height: 640px;
    color: black;
    background-color: rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const SideSpacer = styled.div`
    width: 230px;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    transition:
        transform 0.6s ease,
        opacity 0.6s ease;
    transform-style: preserve-3d;
    transform: ${({ $currentPage }) =>
        $currentPage === 4 ? 'rotateY(0deg)' : 'rotateY(90deg)'};
`;

const HeaderText = styled.span`
    font-size: 64px;
    font-weight: bolder;
    text-decoration: underline;
    text-underline-offset: 16px;
    text-decoration-thickness: 4px;
`;

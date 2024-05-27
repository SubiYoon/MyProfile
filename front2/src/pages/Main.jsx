import React, { useEffect, useRef, useState } from 'react';
import { currentPageState, profileState, stackState } from '../recoil.js';
import Dot from '@/components/layout/Dot.jsx';
import Error from '@/pages/Error.jsx';
import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axiosInstance.js';
import Border from '@/components/Border.jsx';
import { motion } from 'framer-motion';

const Main = () => {
    const [currentPage, setCurrentPage] = useRecoilState(currentPageState);

    const [profileData, setProfileData] = useRecoilState(profileState);
    const [stackData, setStackData] = useRecoilState(stackState);

    const { urlGb } = useParams();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axiosInstance.get(`/api/name/${urlGb}`);
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

    const handleMenuClick = (page) => {
        setCurrentPage(page);
        // sectionRefs[page - 1].current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            {profileData === null ? (
                <Error />
            ) : (
                <>
                    <Wrapper>
                        <Border urlGb={urlGb} />
                        <DotContainer>
                            <Dot onMenuClick={handleMenuClick} />
                        </DotContainer>
                    </Wrapper>
                </>
            )}
        </>
    );
};

export default Main;

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    overflow-y: hidden;
`;

const DotContainer = styled.div`
    display: flex;
    font-family: 'Freesentation';
    align-items: center;
    justify-content: center;
    position: fixed;
    right: 0;
    width: 8%;
    height: 100%;
    //border-left-style: solid;
    //border-color: rgba(230, 27, 57, 1);
`;

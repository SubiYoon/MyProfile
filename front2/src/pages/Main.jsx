import React, { useEffect, useState } from 'react';
import {
    currentPageState,
    profileState,
    stackState,
    careerState,
    educationState,
} from '../recoil.js';
import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axiosInstance.js';
import Border from '@/components/Border.jsx';
import Error from '@/pages/Error.jsx';

const Main = () => {
    const [profileData, setProfileData] = useRecoilState(profileState);
    const [stackData, setStackData] = useRecoilState(stackState);
    const [careerData, setCareerData] = useRecoilState(careerState);
    const [educationData, setEducationData] = useRecoilState(educationState);

    const [isLoading, setIsLoading] = useState(true);

    const { urlGb } = useParams();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axiosInstance.get(`/api/name/${urlGb}`);
                setProfileData(response.data.profile);
                setStackData(response.data.stack);
            } catch (error) {
                console.error('Error fetching profile data:', error);
                setProfileData(null);
                setStackData(null);
            }
        };

        const fetchCareerData = async () => {
            try {
                const response = await axiosInstance.get(
                    `/api/career/${urlGb}`,
                );
                setCareerData(response.data.careers);
            } catch (error) {
                console.error('Error fetching career data:', error);
                setCareerData(null);
            }
        };

        const fetchEducationData = async () => {
            try {
                const response = await axiosInstance.get(
                    `/api/education/${urlGb}`,
                );
                setEducationData(response.data.educations);
            } catch (error) {
                console.error('Error fetching career data:', error);
                setEducationData(null);
            }
        };

        const fetchData = async () => {
            setIsLoading(true);
            await fetchProfileData();
            await fetchCareerData();
            await fetchEducationData();
            setIsLoading(false);
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <div></div>;
    }

    if (!stackData || !profileData || !careerData || !educationData) {
        return <Error />;
    }

    return (
        <Wrapper>
            <Border urlGb={urlGb} />
        </Wrapper>
    );
};

export default Main;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column; /* 각 페이지를 세로로 배치 */
    max-width: 100%;
    height: 100vh;
    overflow-y: hidden; /* 세로 스크롤을 활성화 */
`;

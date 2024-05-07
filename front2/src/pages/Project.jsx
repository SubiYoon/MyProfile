import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentPageState, userState, stackState } from '@/recoil.js';
import { styled } from 'styled-components';
import axiosInstance from '../../axiosInstance.js';

const Project = ({ userGb }) => {
    const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
    const [careerData, setCareerData] = useState(null);

    console.log('user구분', userGb);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axiosInstance.get(
                    `api/career/${userGb}`,
                );
                console.log('리스폰', response.data);
                setCareerData(response.data.careers);
            } catch (error) {
                console.error('Error fetching menu data:', error);
            }
        };
        fetchProfileData();
    }, []);
    return (
        <>
            {careerData ? (
                <>
                    <SideSpacer $currentPage={currentPage} />
                    <ProjectWrapper $currentPage={currentPage}>
                        <HeaderContainer>
                            {careerData.map((careerItem) => (
                                <LineContainer key={careerItem.carrerSeq}>
                                    <LineTop>
                                        <CompanyImage
                                            src={careerItem.companyLogo}
                                        />
                                        <CompanyInfo>
                                            <CompanyName>
                                                {careerItem.company}
                                            </CompanyName>
                                            <CompanyInOut>
                                                {careerItem.in} ~{' '}
                                                {careerItem.out
                                                    ? careerItem.out
                                                    : 'ing'}
                                            </CompanyInOut>
                                        </CompanyInfo>
                                    </LineTop>
                                    <LineBox>
                                        {careerItem.projectList.map(
                                            (projectItem) => (
                                                <div
                                                    key={projectItem.projectSeq}
                                                >
                                                    {projectItem.projectName}
                                                </div>
                                            ),
                                        )}
                                    </LineBox>
                                </LineContainer>
                            ))}
                        </HeaderContainer>
                        <ProjectContainer></ProjectContainer>
                    </ProjectWrapper>
                    <SideSpacer $currentPage={currentPage} />
                </>
            ) : null}
        </>
    );
};

export default Project;

const ProjectWrapper = styled.div`
    display: flex;
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
    width: 30%;
    background-color: rgba(0, 0, 0, 0.8);
    flex-direction: column;
    padding: 60px 16px 60px 16px;
`;

const ProjectContainer = styled.div`
    width: 70%;
    min-height: 640px;
    color: black;
    background-color: rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const SideSpacer = styled.div`
    width: 12%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    transition:
        transform 0.6s ease,
        opacity 0.6s ease;
    transform-style: preserve-3d;
    transform: ${({ $currentPage }) =>
        $currentPage === 4 ? 'rotateY(0deg)' : 'rotateY(90deg)'};
`;

const LineContainer = styled.div`
    padding: 4%;
`;

const LineBox = styled.div`
    position: relative;
    padding: 16px;
    color: white;
    //border-top: 70px solid white;
    border-left: 4px solid white;
    &::after {
        content: '';
        position: absolute;
        left: 0%; /* 왼쪽으로 이동하지 않도록 설정 */
        bottom: 0;
        width: 8%; /* 아래쪽 보더의 길이를 조절 */
        height: 2px;
        background-color: white; /* 아래쪽 보더의 색상 설정 */
        //transform: rotate(-14deg);
    }
`;
const LineTop = styled.div`
    background-color: white;
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    color: black;
    border-radius: 4px;
    left: -2%;
`;

const CompanyInfo = styled.div`
    text-align: center;
    margin-left: 16px;
`;

const CompanyName = styled.p`
    font-size: 24px;
    margin-top: 4%;
    text-align: left;
    font-weight: bolder;
    margin-bottom: 0px;
`;
const CompanyInOut = styled.p`
    font-family: mainFont;
    margin-top: 0px;
    margin-bottom: 4%;
    font-size: 16px;
`;

const CompanyImage = styled.img`
    width: 60px;
    height: 60px;
`;

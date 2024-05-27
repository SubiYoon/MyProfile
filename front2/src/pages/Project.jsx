import React, { useEffect, useState, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentPageState, apiState } from '@/recoil.js';
import { styled } from 'styled-components';
import axiosInstance from '../../axiosInstance.js';
import { MdOutlineComputer } from 'react-icons/md';
import { color, motion } from 'framer-motion';
import DetailProject from '@/components/DetailProject.jsx';

const Project = React.memo(({ userGb }) => {
    const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
    const [careerData, setCareerData] = useState(null);

    const [clickProject, setClickProject] = useState('');
    const [activeProject, setActiveProject] = useState('');
    const [clickProjectItem, setClickProjectItem] = useState();

    const onClickProject = useMemo(() => {
        return (projectItem) => {
            setClickProject(projectItem.projectSeq);
            setActiveProject(projectItem.projectSeq);
            setClickProjectItem(projectItem);
        };
    }, []);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axiosInstance.get(
                    `/api/career/${userGb}`,
                );
                console.log('리스폰', response.data);
                setCareerData(response.data.careers);
                setClickProject(
                    response.data.careers[0].projectList[0].projectSeq,
                );
                setActiveProject(
                    response.data.careers[0].projectList[0].projectSeq,
                );
                setClickProjectItem(response.data.careers[0].projectList[0]);
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
                    <ProjectWrapper
                        initial={{
                            opacity: currentPage === 4 ? 0 : 1,
                            y: 20,
                            rotateY: currentPage === 4 ? 90 : 0,
                        }}
                        animate={{
                            opacity: currentPage !== 4 ? 0 : 1,
                            rotateY: currentPage !== 4 ? 90 : 0,
                        }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                    >
                        <HeaderContainer>
                            {careerData.map((careerItem) => (
                                <LineContainer key={careerItem.careerSeq}>
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
                                                <ProjectBox
                                                    key={projectItem.projectSeq}
                                                    $isActive={
                                                        activeProject ===
                                                        projectItem.projectSeq
                                                    }
                                                    onClick={() =>
                                                        onClickProject(
                                                            projectItem,
                                                        )
                                                    }
                                                >
                                                    <MdOutlineComputer />
                                                    <ProjectName
                                                        $isActive={
                                                            activeProject ===
                                                            projectItem.projectSeq
                                                        }
                                                    >
                                                        {'' +
                                                            projectItem.projectName}
                                                    </ProjectName>
                                                    <ProjectInOut>
                                                        {
                                                            projectItem.projectTerm
                                                        }
                                                    </ProjectInOut>
                                                </ProjectBox>
                                            ),
                                        )}
                                    </LineBox>
                                </LineContainer>
                            ))}
                        </HeaderContainer>
                        <ProjectContainer>
                            <MotionBox
                                key={clickProjectItem?.projectSeq}
                                animate={{
                                    x: 0,
                                }}
                                transition={{
                                    type: 'spring',
                                    x: {
                                        type: 'tween',
                                        from: 1800,
                                        tp: 0,
                                        duration: 0.7,
                                    },
                                    repeat: 1,
                                }}
                            >
                                <DetailProject
                                    clickProjectItem={clickProjectItem}
                                    userGb={userGb}
                                />
                            </MotionBox>
                        </ProjectContainer>
                    </ProjectWrapper>
                </>
            ) : null}
        </>
    );
});

export default Project;

const ProjectWrapper = styled(motion.div)`
    display: flex;
    font-family: 'Pretendard';
    padding: 0% 2% 0% 2%;
    position: absolute;
    width: 100%;
    top: -2.4%;
    left: 0%;
`;

const HeaderContainer = styled(motion.div)`
    display: flex;
    white-space: nowrap; /* 텍스트 줄 바꿈 방지 */
    padding: 1% 1% 0 1%;
    background-color: ${({ theme }) => theme.backgroundColors.lightBlack};
`;

const ProjectContainer = styled(motion.div)`
    color: black;
    width: 68%;
    padding: 0 2% 0 2%;
    flex-direction: column;
    text-align: center;
    align-items: center;
    overflow: hidden;
`;

const LineContainer = styled.div`
    padding: 2%;
`;

const LineBox = styled.div`
    position: relative;
    padding: 30px;
    color: white;
    border-left: 4px solid rgba(228, 225, 220, 1);
`;
const LineTop = styled.div`
    background-color: rgba(228, 225, 220, 1);
    border-style: solid;
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    color: black;
    top: 6px;
    border-radius: 12px;
    left: -3%;
`;

const CompanyInfo = styled.div`
    text-align: center;
    margin-left: 16px;
`;

const CompanyName = styled.p`
    font-size: ${({ theme }) => theme.fonts.mainFontSize};
    margin-top: 4%;
    text-align: left;
    font-weight: bolder;
    margin-bottom: 0px;
`;
const CompanyInOut = styled.p`
    font-family: 'Arita';
    margin-top: 0px;
    margin-bottom: 4%;
    font-size: ${({ theme }) => theme.fonts.smallFontSize};
`;

const CompanyImage = styled.img`
    width: 60px;
    height: 60px;
`;

const ProjectBox = styled.div`
    color: ${({ $isActive }) => ($isActive ? 'rgba(230, 27, 57, 1)' : 'white')};
    transform: ${({ $isActive }) => ($isActive ? 'scale(1.14)' : 0)};
    &:hover {
        transform: scale(1.1);
        cursor: pointer;
        z-index: 1;
    }
`;

const ProjectName = styled.span`
    text-decoration-line: ${({ $isActive }) =>
        $isActive
            ? 'underline'
            : 'none'}; /* isActive가 true일 때만 밑줄이 그어짐 */
    text-underline-offset: 6px;
    text-decoration-thickness: 1px;
    margin-left: 8px;
    font-weight: bolder;
    font-size: ${({ theme }) => theme.fonts.normalFontSize};
`;

const ProjectInOut = styled.p`
    margin-top: 2px;
    margin-left: 8%;
    font-family: 'Arita';
`;

const MotionBox = styled(motion.div)``;

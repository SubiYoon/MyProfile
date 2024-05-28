import React, { useEffect, useState, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { careerState, currentPageState } from '@/recoil.js';
import { styled } from 'styled-components';
import { MdOutlineComputer } from 'react-icons/md';
import { motion } from 'framer-motion';
import DetailProject from '@/components/DetailProject.jsx';

const Project = React.memo(({ urlGb }) => {
    const careerData = useRecoilValue(careerState);
    const currentPage = useRecoilValue(currentPageState);

    console.log('프로젝트으으');

    const [activeProject, setActiveProject] = useState();
    const [clickProjectItem, setClickProjectItem] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const onClickProject = useMemo(() => {
        return (projectItem) => {
            setActiveProject(projectItem.projectSeq);
            setClickProjectItem(projectItem);
        };
    }, []);

    useEffect(() => {
        if (clickProjectItem && activeProject) {
            setIsLoading(false); // 로딩 상태 해제
        }
    }, [clickProjectItem, activeProject]);

    useEffect(() => {
        if (careerData && careerData.length > 0) {
            setActiveProject(careerData[0].projectList[0].projectSeq);
            setClickProjectItem(careerData[0].projectList[0]);
        }
    }, [careerData]);

    if (isLoading) {
        return <h2>Loading...</h2>;
    }

    return (
        <>
            <ProjectWrapper>
                <HeaderContainer
                    animate={{
                        y: 0,
                    }}
                    transition={{
                        type: 'spring',
                        y: {
                            type: 'tween',
                            from: -1800,
                            tp: 0,
                            duration: 0.7,
                        },
                        repeat: 1,
                    }}
                >
                    {careerData.map((careerItem) => (
                        <LineContainer key={careerItem.careerSeq}>
                            <LineTop>
                                <CompanyImage src={careerItem.companyLogo} />
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
                                {careerItem.projectList.map((projectItem) => (
                                    <ProjectBox
                                        key={projectItem.projectSeq}
                                        $isActive={
                                            activeProject ===
                                            projectItem.projectSeq
                                        }
                                        onClick={() =>
                                            onClickProject(projectItem)
                                        }
                                    >
                                        <MdOutlineComputer />
                                        <ProjectName
                                            $isActive={
                                                activeProject ===
                                                projectItem.projectSeq
                                            }
                                        >
                                            {'' + projectItem.projectName}
                                        </ProjectName>
                                        <ProjectInOut>
                                            {projectItem.projectTerm}
                                        </ProjectInOut>
                                    </ProjectBox>
                                ))}
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
                            userGb={urlGb}
                        />
                    </MotionBox>
                </ProjectContainer>
            </ProjectWrapper>
        </>
    );
});

export default Project;

const ProjectWrapper = styled(motion.div)`
    display: flex;
    font-family: 'Pretendard';
    position: absolute;
    top: 0;
    width: 88%;
`;

const HeaderContainer = styled(motion.div)`
    display: flex;
    white-space: nowrap; /* 텍스트 줄 바꿈 방지 */
    border-radius: 12px;
    padding: 1% 1% 0 1%;
    background-color: ${({ theme }) => theme.backgroundColors.lightBlack};
`;

const ProjectContainer = styled(motion.div)`
    color: black;
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
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    color: black;
    top: 1%;
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

import React, { useEffect, useState, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { careerState } from '@/recoil.js';
import { styled } from 'styled-components';
import { MdOutlineComputer } from 'react-icons/md';
import { motion } from 'framer-motion';
import BasicProjectDetail from '@/components/BasicProjectDetail.jsx';

const Project = React.memo(({ urlGb }) => {
    const careerData = useRecoilValue(careerState);

    const [activeProject, setActiveProject] = useState();
    const [clickProjectItem, setClickProjectItem] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const onClickProject = useMemo(() => {
        return (projectItem) => {
            setActiveProject(projectItem.projectSeq);
            setClickProjectItem(projectItem);
        };
    }, []);

    // const allProjects = careerData.flatMap((career) => career.projectList);
    const parseEndDate = (projectTerm) => {
        const endDateStr = projectTerm.split(' ~ ')[1];
        const [year, month] = endDateStr.split('.');
        return new Date(year, month - 1); // month는 0부터 시작하므로 -1 해줌
    };

    const allProjects = careerData
        .flatMap((career) => career.projectList)
        .sort(
            (a, b) => parseEndDate(b.projectTerm) - parseEndDate(a.projectTerm),
        );

    useEffect(() => {
        if (clickProjectItem && activeProject) {
            setIsLoading(false); // 로딩 상태 해제
        }
    }, [clickProjectItem, activeProject]);

    useEffect(() => {
        if (careerData && careerData.length > 0) {
            setActiveProject(allProjects[0].projectSeq);
            setClickProjectItem(allProjects[0]);
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
                    <LineContainer>
                        {careerData
                            .filter(
                                (careerItem) =>
                                    careerItem.careerSeq ===
                                    clickProjectItem.careerSeq.toString(),
                            )
                            .map((filteredCareerItem) => (
                                <LineTop
                                    key={filteredCareerItem.careerSeq}
                                    animate={{
                                        x: 0,
                                    }}
                                    transition={{
                                        type: 'spring',
                                        x: {
                                            type: 'tween',
                                            from: 400,
                                            tp: 0,
                                            duration: 0.7,
                                        },
                                        repeat: 1,
                                    }}
                                >
                                    <CompanyImageBox>
                                        <CompanyImage
                                            src={`/static/images/career/${filteredCareerItem.companyLogo}`}
                                        />
                                    </CompanyImageBox>
                                    <CompanyInfo>
                                        <CompanyName>
                                            {filteredCareerItem.company}
                                        </CompanyName>
                                        <CompanyInOut>
                                            {filteredCareerItem.in} ~{' '}
                                            {filteredCareerItem.out
                                                ? filteredCareerItem.out
                                                : 'ing'}
                                        </CompanyInOut>
                                    </CompanyInfo>
                                </LineTop>
                            ))}
                        <LineBox>
                            {allProjects.map((projectItem) => (
                                <ProjectBox
                                    key={projectItem.projectSeq}
                                    $isActive={
                                        activeProject === projectItem.projectSeq
                                    }
                                    onClick={() => onClickProject(projectItem)}
                                >
                                    <CheckBox
                                        $isActive={
                                            activeProject ===
                                            projectItem.projectSeq
                                        }
                                    />
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
                        <BasicProjectDetail
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
    width: 88%;
    min-height: 100vh;
`;

const HeaderContainer = styled(motion.div)`
    display: flex;
    white-space: nowrap; /* 텍스트 줄 바꿈 방지 */
    border-radius: 12px;
    padding: 1% 1% 0 1%;
    margin-left: 3%;
    background-color: ${({ theme }) => theme.backgroundColors.lightBlack};
`;

const ProjectContainer = styled(motion.div)`
    color: black;
    padding: 0 6% 0 2%;
    flex-direction: column;
    text-align: center;
    align-items: center;
    overflow: hidden;
    width: 68%;
`;

const LineContainer = styled.div`
    padding: 2%;
    overflow: hidden;
`;

const LineBox = styled.div`
    position: relative;
    padding: 30px;
    color: white;
`;
const LineTop = styled(motion.div)`
    background-color: rgba(228, 225, 220, 1);
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    color: black;
    top: 0;
    border-radius: 12px;
    left: 0;
`;

const CompanyInfo = styled.div`
    text-align: center;
`;

const CompanyName = styled.p`
    font-size: ${({ theme }) => theme.fonts.mainFontSize};
    margin-top: 4%;
    text-align: left;
    font-weight: bolder;
    margin-bottom: 0;
`;

const CompanyInOut = styled.p`
    margin-top: 0;
    margin-bottom: 4%;
    font-size: ${({ theme }) => theme.fonts.smallFontSize};
`;

const CompanyImageBox = styled.div`
    margin-right: 4%;
    margin-top: 1%;
`;

const CompanyImage = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 50%;
`;

const ProjectBox = styled.div`
    color: ${({ $isActive }) => ($isActive ? 'rgba(230, 27, 57, 1)' : 'white')};
    transform: ${({ $isActive }) => ($isActive ? 'scale(1.14)' : 0)};
    position: relative;
    ${({ $isActive }) =>
        !$isActive &&
        `
        &:hover {
            transform: scale(1.1);
            cursor: pointer;
            z-index: 1;
        }
    `}
`;

const CheckBox = styled.div`
    position: absolute;
    width: 4px;
    height: 100%;
    top: 0;
    left: -5.2%;
    border-radius: 12px;
    background-color: ${({ $isActive }) =>
        $isActive ? 'rgba(230, 27, 57, 1)' : 'none'};
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
`;

const MotionBox = styled(motion.div)``;

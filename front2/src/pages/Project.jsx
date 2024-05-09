import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentPageState, userState, stackState } from '@/recoil.js';
import { styled } from 'styled-components';
import axiosInstance from '../../axiosInstance.js';
import { MdOutlineComputer } from 'react-icons/md';
import { motion } from 'framer-motion';

const Project = ({ userGb }) => {
    const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
    const [careerData, setCareerData] = useState(null);

    const [clickProject, setClickProject] = useState('');
    const [activeProject, setActiveProject] = useState('');
    const [clickProjectItem, setClickProjectItem] = useState();

    const onClickProject = (projectItem) => {
        setClickProject(projectItem.projectSeq);
        setActiveProject(projectItem.projectSeq);
        setClickProjectItem(projectItem);
    };

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axiosInstance.get(
                    `api/career/${userGb}`,
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
                    <SideSpacer $currentPage={currentPage} />
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
                        transition={{ delay: 0.4, duration: 0.6 }}
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
                                        from: 1000,
                                        tp: 0,
                                        duration: 0.8,
                                    },
                                    repeat: 1,
                                }}
                            >
                                <DetailProjectName>
                                    {clickProjectItem?.projectName}
                                </DetailProjectName>
                                <DetailProjectBox>
                                    <StackContainer>
                                        <TitleBox>Skills</TitleBox>
                                        {clickProjectItem?.stackList.map(
                                            (item) => (
                                                <StackBox key={item.stackSeq}>
                                                    <StackImg
                                                        src={item.stackImage}
                                                    />
                                                    <StackList>
                                                        {item.stackName}
                                                    </StackList>
                                                </StackBox>
                                            ),
                                        )}
                                    </StackContainer>
                                    <DetailProjectContributeBox>
                                        <TitleBox>Purpose</TitleBox>
                                        <DetailProjectContribute>
                                            {
                                                clickProjectItem?.projectContributeRate
                                            }
                                        </DetailProjectContribute>
                                    </DetailProjectContributeBox>
                                </DetailProjectBox>
                            </MotionBox>
                        </ProjectContainer>
                    </ProjectWrapper>
                    <SideSpacer $currentPage={currentPage} />
                </>
            ) : null}
        </>
    );
};

export default Project;

const ProjectWrapper = styled(motion.div)`
    display: flex;
    font-family: 'profileFont';
`;

const HeaderContainer = styled.div`
    background-color: rgba(0, 0, 0, 0.92);
    display: flex;
    white-space: nowrap; /* 텍스트 줄 바꿈 방지 */
    width: max-content;
    padding: 24px 16px 24px 16px;
`;

const ProjectContainer = styled(motion.div)`
    color: black;
    padding: 24px;
    background-color: rgba(255, 255, 255, 0.92);
    flex-direction: column;
    text-align: center;
    align-items: center;
    overflow: hidden;
`;

const DetailProjectName = styled(motion.div)`
    padding: 1%;
    border-radius: 12px;
    border-style: solid;
    border-width: 1px;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    box-shadow: 8px 8px 10px rgba(0, 0, 0, 0.9);
    font-size: 46px;
    margin-bottom: 6%;
    font-family: 'Impact', sans-serif; /* 글꼴을 Impact로 변경 */
`;

const DetailProjectBox = styled.div`
    color: white;
    background-color: rgba(0, 0, 0, 0.8);
    padding: 8px;
    border-radius: 16px;
`;

const StackContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 4%;
    margin-bottom: 10%;
    position: relative;
    font-family: mainFont;
`;

const TitleBox = styled(motion.div)`
    padding: 1%;
    position: absolute;
    top: -74px;
    left: -26px;
    border-radius: 12px;
    border-style: solid;
    border-width: 1px;
    background-color: rgba(0, 0, 0, 0.8);
    font-size: 26px;
    color: white;
    box-shadow: 8px 8px 10px rgba(0, 0, 0, 0.9);
`;

const StackBox = styled.div`
    display: flex;
    align-items: center;
    margin-top: 1%;
`;

const StackImg = styled.img`
    width: 50px;
    height: 50px;
    margin-left: 10px;
`;

const StackList = styled.span`
    margin-left: 10px;
    font-size: 18px;
    color: white;
`;

const DetailProjectContributeBox = styled.div`
    position: relative;
    padding: 2%;
    text-align: left;
`;

const DetailProjectContribute = styled.span`
    font-size: 20px;
`;

const SideSpacer = styled.div`
    width: 12%;
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
    border-left: 4px solid white;
    &::after {
        content: '';
        position: absolute;
        left: 0%;
        bottom: 0;
        width: 8%;
        background-color: red;
        height: 2px;
        background-color: white;
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

const ProjectBox = styled.div`
    padding: 12px;
    color: ${({ $isActive }) => ($isActive ? 'rgb(0, 255, 255);' : 'white')};
    transform: ${({ $isActive }) => ($isActive ? 'scale(1.1)' : 0)};
    &:hover {
        transform: scale(1.1);
        cursor: pointer;
        z-index: 1;
    }
`;

const ProjectName = styled.span`
    font-size: ${({ $isActive }) => ($isActive ? '22px' : '20px')};
    text-decoration-line: ${({ $isActive }) =>
        $isActive
            ? 'underline'
            : 'none'}; /* isActive가 true일 때만 밑줄이 그어짐 */
    text-underline-offset: 6px;
    text-decoration-thickness: 1px;
    margin-left: 8px;
    font-weight: bolder;
`;

const ProjectInOut = styled.p`
    margin-top: 2px;
    font-family: mainFont;
`;

const MotionBox = styled(motion.div)``;

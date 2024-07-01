import React from 'react';
import { styled } from 'styled-components';
import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import { educationState } from '@/recoil.js';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { PiStudentFill } from 'react-icons/pi';
import { IoIosArrowForward } from 'react-icons/io';
import { MdCalendarToday } from 'react-icons/md';

const Education = React.memo(() => {
    const educationData = useRecoilValue(educationState);

    const renderStars = (level) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (level >= (i + 1) * 2) {
                stars.push(<FaStar key={i} />);
            } else if (level >= i * 2 + 1) {
                stars.push(<FaStarHalfAlt key={i} />);
            } else {
                stars.push(<FaRegStar key={i} />);
            }
        }
        return stars;
    };

    return (
        <EducationWrapper>
            {educationData.map((eudData) => (
                <React.Fragment key={eudData.eduSeq}>
                    <EducationContainer>
                        <EducationHeader>
                            <LineBox />
                            <IconContainer>
                                <StudyIconBox>
                                    <PiStudentFill />
                                </StudyIconBox>
                                <IconBox>
                                    <LevelLabel>level</LevelLabel>
                                    <StarContainer>
                                        {renderStars(eudData.eduLevel)}
                                    </StarContainer>
                                </IconBox>
                                <IconBox2>
                                    <LevelLabel>achievement</LevelLabel>
                                    <StarContainer>
                                        {renderStars(eudData.eduAchievement)}
                                    </StarContainer>
                                </IconBox2>
                                <IconBox3>
                                    <LevelLabel>understanding</LevelLabel>
                                    <StarContainer>
                                        {renderStars(eudData.eduUnderstanding)}
                                    </StarContainer>
                                </IconBox3>
                            </IconContainer>
                            <LogoBox>
                                <EducationTitle>
                                    {eudData.eduCompany}
                                </EducationTitle>
                                <EducationLogoImgBox>
                                    <EducationLogoImg
                                        src={`/static/education/${eudData.eduCompanyLogo}`}
                                    />
                                </EducationLogoImgBox>
                                <EducationDayBox>
                                    <EducationDay>
                                        {eudData.eduStartDate} ~{' '}
                                        {eudData.eduEndDate}
                                    </EducationDay>
                                    <MdCalendarToday />
                                </EducationDayBox>
                            </LogoBox>
                        </EducationHeader>
                        <EducationName>{eudData.eudName}</EducationName>
                        <EducationContentBox>
                            <ContentBox>
                                여기에 해당 교육 과정에 대한 설명이 들어갈
                                예정인데 아직 미정이지요? ㅎㅎㅎㅎㅎㅎㅎ
                            </ContentBox>
                        </EducationContentBox>
                    </EducationContainer>
                </React.Fragment>
            ))}
        </EducationWrapper>
    );
});

export default Education;

const EducationWrapper = styled(motion.div)`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    color: rgb(0, 0, 2);
    font-family: 'menlo';
    position: relative;
    font-size: ${({ theme }) => theme.fonts.smallFontSize};
`;

const EducationContainer = styled.div`
    display: flex;
    padding: 1% 1% 1% 2%;
    margin-bottom: 1%;
    position: relative;
    justify-content: left;
    flex-direction: column;
    @media screen and (max-width: 768px) {
        font-size: ${({ theme }) => theme.fonts.mobile.smallFontSize};
    }
`;

const EducationHeader = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    color: black;
`;

const EducationName = styled.div`
    display: flex;
    margin-top: 11px;
    margin-bottom: 1%;
    width: 100%;
    background-color: #0c0c0d;
    z-index: 1;
    padding-left: 0.5%;
    color: rgb(90, 245, 138);
    @media screen and (max-width: 768px) {
        margin-top: 15px;
    }
`;

const IconContainer = styled.div`
    display: flex;
    height: 26px;
    align-items: center;
    justify-content: left;
    clip-path: polygon(
        0 0,
        calc(100% - 14px) 0,
        100% 50%,
        calc(100% - 14px) 100%,
        0 100%
    );
`;

const StudyIconBox = styled.div`
    display: flex;
    padding: 0 20px 0 8px;
    background-color: rgb(96, 134, 176);
    height: 100%;
    align-items: center;
    color: rgb(235, 236, 237);
    justify-content: center;
    clip-path: polygon(
        0 0,
        calc(100% - 14px) 0,
        100% 50%,
        calc(100% - 14px) 100%,
        0 100%
    );
`;

const IconBox = styled.div`
    display: flex;
    height: 100%;
    position: relative;
    left: -16px;
    padding: 0 24px 0 24px;
    align-items: center;
    background-color: rgb(186, 159, 229);
    clip-path: polygon(
        0 0,
        calc(100% - 14px) 0,
        calc(100% - 0px) 50%,
        calc(100% - 14px) 100%,
        0 100%,
        14px 50%
    );
    z-index: 1;
`;

const IconBox2 = styled.div`
    display: flex;
    position: relative;
    left: -30px;
    height: 100%;
    padding: 0 24px 0 24px;
    align-items: center;
    background-color: rgb(50, 149, 216);
    clip-path: polygon(
        0 0,
        calc(100% - 14px) 0,
        calc(100% - 0px) 50%,
        calc(100% - 14px) 100%,
        0 100%,
        14px 50%
    );
`;

const IconBox3 = styled.div`
    display: flex;
    position: relative;
    left: -46px;
    height: 100%;
    padding: 0 20px 0 24px;
    align-items: center;
    background-color: rgb(47, 199, 112);
    clip-path: polygon(
        0 0,
        calc(100% - 14px) 0,
        calc(100% - 0px) 50%,
        calc(100% - 14px) 100%,
        0 100%,
        14px 50%
    );
`;

const LevelLabel = styled.span`
    white-space: nowrap;
    margin-right: 4%;
`;

const StarContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    svg {
        margin-bottom: 2%;
        color: yellow;
        margin-right: 5px;
    }
`;

const LogoBox = styled.div`
    display: flex;
    margin-left: auto;
    padding-left: 2%;
    background-color: rgb(253, 144, 207);
    align-items: center;
    justify-content: right;
    clip-path: polygon(0 50%, 14px 0, 100% 0, 100% 100%, 14px 100%);
    @media screen and (max-width: 768px) {
        padding-left: 6%;
        white-space: nowrap;
    }
`;

const LineBox = styled.div`
    position: absolute;
    top: 50%;
    left: -1.8%;
    border-radius: 6px;
    width: 30px;
    height: 32px;
    border-style: solid;
    border-width: 2px;
    border-right: none;
    border-color: rgb(101, 101, 104);
`;

const EducationLogoImgBox = styled.div`
    display: flex;
    width: 26px;
    height: 26px;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    margin-right: 6px;
    @media screen and (max-width: 768px) {
        width: 20px;
        height: 20px;
        margin-right: 4px;
    }
`;

const EducationDayBox = styled.div`
    display: flex;
    height: 26px;
    background-color: rgb(96, 134, 178);
    align-items: center;
    color: rgb(200, 211, 226);
    padding: 0 10px 0 24px;
    clip-path: polygon(0 50%, 14px 0, 100% 0, 100% 100%, 14px 100%);
    @media screen and (max-width: 768px) {
        white-space: nowrap;
    }
`;

const EducationDay = styled.span`
    margin-right: 12px;
`;

const EducationTitle = styled.span`
    margin-right: 6px;
`;

const EducationLogoImg = styled.img`
    width: 80%;
    height: 80%;
    background-color: white;
    border-radius: 50%;
    @media screen and (max-width: 768px) {
        width: 80%;
        height: 80%;
    }
`;

const EducationContentBox = styled.div`
    display: flex;
    width: 100%;
    color: rgb(244, 245, 246);
`;

const ContentBox = styled.span`
    padding-left: 1%;
    display: flex;
`;

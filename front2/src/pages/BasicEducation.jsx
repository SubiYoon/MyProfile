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
            <EducationTop>
                <RoundButton />
                <RoundButton2 />
                <RoundButton3 />
                -zsh
                <TopIcon src="/assets/icons/option.png" />
            </EducationTop>
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
                        {/*<LeftBox>*/}
                        {/*    <TopBox>*/}
                        {/*        <EducationLogoImgBox>*/}
                        {/*            <EducationLogoImg*/}
                        {/*                src={`/static/logo/${eudData.eduCompanyLogo}`}*/}
                        {/*            />*/}
                        {/*        </EducationLogoImgBox>*/}
                        {/*        <EducationTitle>*/}
                        {/*            {eudData.eduCompany}*/}
                        {/*        </EducationTitle>*/}
                        {/*    </TopBox>*/}
                        {/*    <EducationDay>*/}
                        {/*        {eudData.eduStartDate} ~ {eudData.eduEndDate}*/}
                        {/*    </EducationDay>*/}
                        {/*</LeftBox>*/}
                        {/*<RightBox>*/}
                        {/*    <EducationHeader>*/}
                        {/*        <NameContainer>*/}
                        {/*            <EducationName>*/}
                        {/*                {eudData.eudName}*/}
                        {/*            </EducationName>*/}
                        {/*        </NameContainer>*/}
                        {/*        <IconContainer>*/}
                        {/*            <IconBox>*/}
                        {/*                <LevelLabel>난이도</LevelLabel>*/}
                        {/*                <StarContainer>*/}
                        {/*                    {renderStars(eudData.eduLevel)}*/}
                        {/*                </StarContainer>*/}
                        {/*            </IconBox>*/}
                        {/*            <IconBox>*/}
                        {/*                <LevelLabel>성취도</LevelLabel>*/}
                        {/*                <StarContainer>*/}
                        {/*                    {renderStars(*/}
                        {/*                        eudData.eduAchievement,*/}
                        {/*                    )}*/}
                        {/*                </StarContainer>*/}
                        {/*            </IconBox>*/}
                        {/*            <IconBox>*/}
                        {/*                <LevelLabel>이해도</LevelLabel>*/}
                        {/*                <StarContainer>*/}
                        {/*                    {renderStars(*/}
                        {/*                        eudData.eduUnderstanding,*/}
                        {/*                    )}*/}
                        {/*                </StarContainer>*/}
                        {/*            </IconBox>*/}
                        {/*        </IconContainer>*/}
                        {/*    </EducationHeader>*/}
                        {/*    <EducationContentBox>*/}
                        {/*        <ContentBox>*/}
                        {/*            여기에 해당 교육 과정에 대한 설명이 들어갈*/}
                        {/*            예정인데 아직 미정이지요? ㅎㅎㅎㅎㅎㅎㅎ*/}
                        {/*        </ContentBox>*/}
                        {/*    </EducationContentBox>*/}
                        {/*</RightBox>*/}
                    </EducationContainer>
                </React.Fragment>
            ))}
            <EducationRight />
            <EducationBottom />
        </EducationWrapper>
    );
});

export default Education;

const EducationWrapper = styled(motion.div)`
    display: flex;
    flex-direction: column;
    width: 70%;
    margin: 2% 0 2% 0;
    min-height: 680px;
    height: 100%;
    color: rgb(0, 0, 2);
    font-family: 'Pretendard';
    padding: 2% 0 2% 0;
    background-color: ${({ theme }) => theme.backgroundColors.darkGray};
    border-radius: 16px;
    position: relative;
    border-style: solid;
    border-color: rgb(117, 117, 120);
    border-width: 1px;
`;

const EducationTop = styled.div`
    display: flex;
    position: absolute;
    text-align: center;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 40px;
    top: 0;
    color: rgb(180, 179, 185);
    font-weight: bold;
    font-size: ${({ theme }) => theme.fonts.normalFontSize};
    border-radius: 16px 16px 0 0;
    background-color: rgb(57, 56, 63);
    border-bottom-style: solid;
    border-bottom-color: rgb(3, 3, 7);
    border-width: 1px;
    z-index: 1;
`;

const RoundButton = styled.button`
    position: absolute;
    left: 1%;
    top: 24%;
    height: 22px;
    width: 22px;
    border-radius: 50%;
    background-color: rgb(251, 95, 90);
    border: none;
`;

const RoundButton2 = styled.button`
    position: absolute;
    left: 4%;
    top: 24%;
    height: 22px;
    width: 22px;
    border-radius: 50%;
    background-color: rgb(253, 187, 50);
    border: none;
`;
const RoundButton3 = styled.button`
    position: absolute;
    left: 7%;
    top: 24%;
    height: 22px;
    width: 22px;
    border-radius: 50%;
    background-color: rgb(45, 197, 66);
    border: none;
`;

const TopIcon = styled.img`
    position: absolute;
    right: 1%;
    top: 24%;
    height: 22px;
    border: none;
    color: red;
`;

const EducationBottom = styled.div`
    display: flex;
    position: absolute;
    width: 100%;
    height: 30px;
    bottom: 0;
    border-radius: 0 0 16px 16px;
    background-color: rgb(50, 50, 53);
    border-top-style: solid;
    border-top-color: rgb(53, 56, 64);
    border-width: 1px;
    z-index: 1;
`;

const EducationRight = styled.div`
    display: flex;
    position: absolute;
    width: 20px;
    border-radius: 16px;
    top: 2%;
    height: 97%;
    right: 0;
    background-color: rgb(51, 55, 65);
    border-left-style: solid;
    border-left-color: rgb(59, 63, 73);
    border-width: 1px;
`;

const EducationContainer = styled.div`
    display: flex;
    padding: 2% 3% 1% 3%;
    margin-bottom: 2%;
    position: relative;
    justify-content: left;
    flex-direction: column;
`;

const LeftBox = styled.div`
    display: flex;
    float: left;
    align-items: center;
    flex-direction: column;
    margin-right: 2%;
`;

const RightBox = styled.div`
    display: flex;
    float: right;
    flex-direction: column;
`;

const EducationHeader = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    color: black;
`;

const EducationName = styled.div`
    display: flex;
    margin-top: 14px;
    margin-bottom: 2%;
    width: 100%;
    background-color: rgb(39, 42, 57);
    z-index: 1;
    padding-left: 1%;
    color: rgb(90, 245, 138);
`;

const IconContainer = styled.div`
    display: flex;
    height: 26px;
    align-items: center;
    justify-content: left;
    font-family: 'D2Coding';
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
    font-size: ${({ theme }) => theme.fonts.normalFontSize};
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
    font-size: ${({ theme }) => theme.fonts.smallFontSize};
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
    font-size: ${({ theme }) => theme.fonts.smallFontSize};
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
    font-size: ${({ theme }) => theme.fonts.smallFontSize};
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
    font-size: ${({ theme }) => theme.fonts.smallFontSize};
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
    font-size: ${({ theme }) => theme.fonts.smallFontSize};
    clip-path: polygon(0 50%, 14px 0, 100% 0, 100% 100%, 14px 100%);
`;

const LineBox = styled.div`
    position: absolute;
    top: 50%;
    left: -1.8%;
    border-radius: 6px;
    width: 24px;
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
`;

const EducationDayBox = styled.div`
    display: flex;
    height: 26px;
    background-color: rgb(96, 134, 178);
    align-items: center;
    color: rgb(200, 211, 226);
    padding: 0 10px 0 24px;
    clip-path: polygon(0 50%, 14px 0, 100% 0, 100% 100%, 14px 100%);
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
`;

const EducationContentBox = styled.div`
    display: flex;
    width: 100%;
    color: rgb(244, 245, 246);
`;

const ContentBox = styled.span`
    padding-left: 1%;
    display: flex;
    font-size: ${({ theme }) => theme.fonts.smallFontSize};
`;

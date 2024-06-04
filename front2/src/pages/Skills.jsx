import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { currentPageState, stackState } from '@/recoil.js';
import Header from '@/pages/Header.jsx';
import { motion, AnimatePresence } from 'framer-motion';

const Skills = React.memo(() => {
    console.log('스킬 페이지');
    const currentPage = useRecoilValue(currentPageState);
    const stackData = useRecoilValue(stackState);

    const [clickSkill, setClickSkill] = useState('');
    const [activeSkill, setActiveSkill] = useState('');
    const [displayCheck, setDisplayCheck] = useState('');

    if (!stackData) {
        return <h2>Loading...</h2>;
    }

    const categories = new Set();
    let skills = [];
    for (let i = 0; i < stackData.length; i++) {
        categories.add(stackData[i].category);
    }
    categories.forEach((data) => {
        skills.push(data);
    });

    const HeaderText = 'What Can I Do?';

    const onClickSkill = (skill) => {
        setClickSkill(skill);
        setActiveSkill(skill);
        setTimeout(() => {
            setDisplayCheck(skill);
        }, 2000);
    };

    useEffect(() => {
        setClickSkill(stackData[0]?.category);
        setActiveSkill(stackData[0]?.category);
    }, [stackData]);

    return (
        <AnimatePresence>
            <SkillsWapper>
                <TitleContainer>
                    <TitleHeader>
                        {currentPage === 3 ? (
                            <Header text={HeaderText} gb={'skills'} />
                        ) : null}
                    </TitleHeader>
                    {skills.map((skill, index) => (
                        <TitleSkills
                            $isActive={activeSkill === skill}
                            key={index}
                            index={index}
                            onClick={() => onClickSkill(skill)}
                        >
                            {skill}
                        </TitleSkills>
                    ))}
                </TitleContainer>
                <SkillsContainer>
                    {stackData.map((item, index) => {
                        return (
                            <SkillBox
                                key={item.stackSeq}
                                index={index}
                                $isActive={clickSkill === item.category}
                                $displayCheck={displayCheck === item.category}
                            >
                                <StackImage
                                    src={`/static/stack/${item.stackImage}`}
                                />
                                <SkillName>{item.stackName}</SkillName>
                                <SkillDetail>{item.stackDetail}</SkillDetail>
                            </SkillBox>
                        );
                    })}
                </SkillsContainer>
            </SkillsWapper>
        </AnimatePresence>
    );
});

export default Skills;

const SkillsWapper = styled(motion.div)`
    display: flex;
    width: 88%;
    min-height: 100vh;
    flex-direction: column;
    font-family: 'Pretendard';
    color: white;
`;
const TitleContainer = styled.div`
    padding: 0.2% 2% 0.2% 2%;
    display: flex;
    color: white;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
    border-style: solid;
    border-radius: 12px;
    margin-bottom: 3%;
    position: relative; /* 가상 요소의 위치를 조정하기 위해 필요합니다 */
`;

const TitleHeader = styled.p`
    font-size: ${({ theme }) => theme.fonts.largeFontSize};
    width: 16%;
`;

const TitleSkills = styled.p`
    font-size: ${({ theme, $isActive }) =>
        $isActive ? theme.fonts.largeFontSize : theme.fonts.mainFontSize};
    font-weight: ${({ $isActive }) => ($isActive ? 'bold' : null)};
    margin: auto;
    text-decoration-line: ${({ $isActive }) =>
        $isActive
            ? 'underline'
            : 'none'}; /* isActive가 true일 때만 밑줄이 그어짐 */
    text-underline-offset: 8px;
    text-decoration-thickness: 2px;
    &:hover {
        transition: 0.4s;
        cursor: pointer;
        font-size: ${({ theme }) => theme.fonts.largeFontSize};
    }
`;

const SkillsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    font-family: 'Pretendard';
`;

const SkillBox = styled.div`
    position: ${({ $isActive }) => ($isActive ? 'relative' : 'absolute')};
    width: 30.9%;
    border-style: solid;
    border-radius: 16px;
    margin: 16px;
    background-color: rgba(0, 0, 0, 0.8);
    text-align: center;
    transition:
        transform 0.6s ease,
        opacity 0.6s ease;
    transform-style: preserve-3d;
    transform: ${({ $isActive }) =>
        $isActive ? 'rotateY(0deg)' : 'rotateY(90deg)'};
    //사라질때 효과 숨김
    visibility: ${({ $isActive }) => ($isActive ? 'visible' : 'hidden')};
    &:hover {
        transition: 0.6s;
        transform: scale(1.2);
        cursor: pointer;
        z-index: 1;
    }
`;
const StackImage = styled.img`
    width: 90px;
    height: 90px;
    position: absolute;
    left: -50px;
    top: -45px;
    border-radius: 16px;
    border-style: solid;
    transform: rotate(-10deg);
    background-color: rgba(255, 255, 255, 0.92);
`;

const SkillName = styled.p`
    text-align: center;
    font-size: ${({ theme }) => theme.fonts.largeFontSize};
    margin-top: 16px;
    text-decoration-line: underline;
    text-underline-offset: 8px;
    text-decoration-thickness: 2px;
`;

const SkillDetail = styled.p`
    text-align: left;
    padding: 20px;
    font-size: ${({ theme }) => theme.fonts.normalFontSize};
`;

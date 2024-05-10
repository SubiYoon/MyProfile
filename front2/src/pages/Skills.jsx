import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { currentPageState, stackState, apiState } from '@/recoil.js';
import Header from '@/pages/Header.jsx';
import { motion } from 'framer-motion';

const Skills = () => {
    const currentPage = useRecoilValue(currentPageState);
    const stackData = useRecoilValue(stackState);

    const [clickSkill, setClickSkill] = useState('');
    const [activeSkill, setActiveSkill] = useState('');
    const [displayCheck, setDisplayCheck] = useState('');

    const apiData = useRecoilValue(apiState);

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
        <>
            <SideSpacer $currentPage={currentPage} />
            <SkilsWapper
                initial={{
                    opacity: currentPage === 3 ? 0 : 1,
                    y: 20,
                    rotateY: currentPage === 3 ? 90 : 0,
                }}
                animate={{
                    opacity: currentPage !== 3 ? 0 : 1,
                    rotateY: currentPage !== 3 ? 90 : 0,
                }}
                transition={{ delay: 0.3, duration: 0.4 }}
            >
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
                                    src={`${apiData}/${item.stackImage}`}
                                />
                                <SkillName>{item.stackName}</SkillName>
                                <SkillDetail>{item.stackDetail}</SkillDetail>
                            </SkillBox>
                        );
                    })}
                </SkillsContainer>
            </SkilsWapper>
            <SideSpacer $currentPage={currentPage} />
        </>
    );
};

export default Skills;

const SkilsWapper = styled(motion.div)`
    display: flex;
    flex-direction: column;
    width: 100%;
    top: 0;
    min-height: 100vh;
    font-family: 'mainFont';
`;
const TitleContainer = styled.div`
    padding: 24px;
    display: flex;
    height: 60px;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 12px;
    align-items: center;
    margin-bottom: 32px;
`;

const TitleHeader = styled.p`
    font-size: 36px;
    width: 320px;
`;

const TitleSkills = styled.p`
    font-size: ${({ $isActive }) => ($isActive ? '34px' : '24px')};
    font-weight: ${({ $isActive }) => ($isActive ? 'bold' : null)};
    margin: auto;
    text-decoration-line: ${({ $isActive }) =>
        $isActive
            ? 'underline'
            : 'none'}; /* isActive가 true일 때만 밑줄이 그어짐 */
    text-underline-offset: 8px;
    text-decoration-thickness: 2px;
    &:hover {
        cursor: pointer;
        font-size: 34px;
        text-decoration-line: underline;
    }
`;

const SkillsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    font-family: 'profileFont';
`;

const SkillBox = styled.div`
    position: ${({ $isActive }) => ($isActive ? 'relative' : 'absolute')};
    width: 30%;
    height: 260px;
    background-color: rgba(0, 0, 0, 0.8);
    border-style: solid;
    border-color: white;
    border-radius: 16px;
    margin: 16px;
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
    background-color: white;
`;

const SkillName = styled.p`
    text-align: center;
    font-size: 30px;
    margin-top: 16px;
    text-decoration-line: underline;
    text-underline-offset: 8px;
    text-decoration-thickness: 2px;
`;

const SkillDetail = styled.p`
    text-align: left;
    padding: 20px;
    font-size: 18px;
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
        $currentPage === 3 ? 'rotateY(0deg)' : 'rotateY(90deg)'};
`;

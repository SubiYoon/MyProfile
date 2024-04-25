import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';
import { currentPageState, stackState, userState } from '@/recoil.js';

const Skills = () => {
    const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
    const [stackData, setStackData] = useRecoilState(stackState);

    const [typedText, setTypedText] = useState('');
    const [textIndex, setTextIndex] = useState(0);
    const [clickSkill, setClickSkill] = useState('Frontend');
    const [activeSkill, setActiveSkill] = useState('Frontend');
    const [displayCheck, setDisplayCheck] = useState('');

    const categories = new Set();
    let skills = [];
    for(let i=0; i<stackData.length; i++){
        categories.add(stackData[i].category);
    }
    categories.forEach(data => {
            skills.push(data)
    })




    const HeaderText = 'What Can I Do?';

    const onClickSkill = (skill) => {
        setClickSkill(skill);
        setActiveSkill(skill);
        setTimeout(() => {
            setDisplayCheck(skill);
            console.log('확인', displayCheck);
        }, 2000); // 4초 뒤에 실행되도록 4000ms로 설정
    };

    //텍스트 타이핑 효과
    useEffect(() => {
        if (currentPage === 3) {
            const mainTextTypingTimer = setTimeout(() => {
                if (textIndex < HeaderText.length) {
                    setTypedText(HeaderText.substring(0, textIndex + 1));
                    setTextIndex((prevIndex) => prevIndex + 1);
                }
            }, 120);

            return () => clearTimeout(mainTextTypingTimer);
        }
    }, [textIndex, HeaderText, currentPage]);

    return (
        <>
            <SideSpacer $currentPage={currentPage} />
            <SkilsWapper $currentPage={currentPage}>
                <TitleContainer>
                    <TitleHeader>{typedText}</TitleHeader>
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
                                <StackImage src={item.stackImage} />
                                {item.stackName}
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

const SkilsWapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 80%;
    font-family: 'mainFont';
    transition:
        transform 0.6s ease,
        opacity 0.6s ease;
    transform-style: preserve-3d;
    transform: ${({ $currentPage }) =>
        $currentPage === 3 ? 'rotateY(0deg)' : 'rotateY(90deg)'};
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
`;

const TitleSkills = styled.p`
    font-size: ${({ $isActive }) => ($isActive ? '34px' : '24px')};
    font-weight: ${({ $isActive }) => ($isActive ? 'bold' : null)};
    margin: auto;
    text-decoration: underline;
    text-underline-offset: 8px;
    text-decoration-thickness: 2px;
    &:hover {
        cursor: pointer;
        font-size: 34px;
    }
`;

const SkillsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
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
    transition:
        transform 0.6s ease,
        opacity 0.6s ease;
    transform-style: preserve-3d;
    transform: ${({ $isActive }) =>
        $isActive ? 'rotateY(0deg)' : 'rotateY(90deg)'};
    &:hover {
        transform: scale(1.2);
        cursor: pointer;
        z-index: 1;
    }
`;
const StackImage = styled.img`
    width: 180px;
    height: 80px;
    position: absolute;
    left: -24px;
    top: -36px;
    border-radius: 12px;
    border-style: solid;
    transform: rotate(-10deg);
`;

const SideSpacer = styled.div`
    width: 230px;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    transition:
        transform 0.6s ease,
        opacity 0.6s ease;
    transform-style: preserve-3d;
    transform: ${({ $currentPage }) =>
        $currentPage === 3 ? 'rotateY(0deg)' : 'rotateY(90deg)'};
`;

import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { stackState } from '@/recoil.js';
import { motion } from 'framer-motion';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

const Skills = React.memo(() => {
    const stackData = useRecoilValue(stackState);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(0);

    const [clickSkill, setClickSkill] = useState('');
    const [activeSkill, setActiveSkill] = useState('');
    const [displayCheck, setDisplayCheck] = useState('');

    const skillsContainerRef = useRef(null);

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
        setCurrentPage(0); // 카테고리 변경 시에 현재 페이지 초기화
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

    useEffect(() => {
        const updateItemsPerPage = () => {
            if (skillsContainerRef.current) {
                const containerWidth = skillsContainerRef.current.offsetWidth;
                const itemWidth = 80; // 각 스킬의 가로 크기 (px)
                const itemsPerPage = Math.floor(containerWidth / itemWidth);
                setItemsPerPage(itemsPerPage);
            }
        };

        updateItemsPerPage();
        window.addEventListener('resize', updateItemsPerPage);
        return () => {
            window.removeEventListener('resize', updateItemsPerPage);
        };
    }, []);

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    };

    const handleNextPage = () => {
        const filteredData = stackData.filter(
            (item) => item.category === clickSkill,
        );
        setCurrentPage((prevPage) =>
            Math.min(
                prevPage + 1,
                Math.ceil(filteredData.length / itemsPerPage) - 1,
            ),
        );
    };

    const filteredStackData = stackData.filter(
        (item) => item.category === clickSkill,
    );
    const totalPages = Math.ceil(filteredStackData.length / itemsPerPage);

    return (
        <SkillsWrapper>
            <TitleContainer>
                <TitleHeader>{HeaderText}</TitleHeader>
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
            <SkillsContainer ref={skillsContainerRef}>
                {filteredStackData
                    .slice(
                        currentPage * itemsPerPage,
                        (currentPage + 1) * itemsPerPage,
                    )
                    .map((item, index) => (
                        <SkillBox
                            key={item.stackSeq}
                            index={index}
                            $isActive={clickSkill === item.category}
                            $displayCheck={displayCheck === item.category}
                            initial={{
                                rotateY: 90,
                                opacity: 0,
                            }}
                            animate={{
                                rotateY: 0,
                                opacity: 1,
                            }}
                            transition={{
                                type: 'spring',
                                duration: 0.1,
                            }}
                        >
                            <StackImage
                                src={`/static/stack/${item.stackImage}`}
                            />
                            <SkillName>{item.stackName}</SkillName>
                        </SkillBox>
                    ))}
            </SkillsContainer>
            {currentPage > 0 && (
                <ScrollPrevButton onClick={handlePrevPage}>
                    <AiOutlineLeft />
                </ScrollPrevButton>
            )}
            {currentPage < totalPages - 1 && (
                <ScrollNextButton onClick={handleNextPage}>
                    <AiOutlineRight />
                </ScrollNextButton>
            )}
            {totalPages > 1 && (
                <ScrollCount>
                    {currentPage + 1}/{totalPages}
                </ScrollCount>
            )}
        </SkillsWrapper>
    );
});

export default Skills;

const SkillsWrapper = styled(motion.div)`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    color: white;
    overflow: hidden;
`;

const TitleContainer = styled.div`
    display: flex;
    color: white;
    align-items: center;
`;

const TitleHeader = styled.p`
    flex-wrap: wrap;
    color: rgb(253, 164, 1);
`;

const TitleSkills = styled.p`
    font-weight: ${({ $isActive }) => ($isActive ? 'bold' : null)};
    margin: auto;
    color: ${({ $isActive, theme }) =>
        $isActive ? theme.colors.green : 'none'};
    text-decoration-line: ${({ $isActive }) =>
        $isActive ? 'underline' : 'none'};
    text-underline-offset: 8px;
    text-decoration-thickness: 1px;
    &:hover {
        transition: 0.4s;
        cursor: pointer;
        transform: scale(1.1);
    }
`;

const SkillsContainer = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    height: 50%;
    padding-left: 3%;
    flex-wrap: wrap;
    margin: 0 auto;
`;

const SkillBox = styled(motion.div)`
    position: ${({ $isActive }) => ($isActive ? 'relative' : 'absolute')};
    width: 24%;
    height: 60px;
    border-style: dashed;
    border-radius: 12px;
    border-width: 2px;
    margin: 32px 26px 0 26px;
    transition:
        transform 0.6s ease,
        opacity 0.6s ease;
    transform-style: preserve-3d;
    transform: ${({ $isActive }) =>
        $isActive ? 'rotateY(0deg)' : 'rotateY(90deg)'};
    visibility: ${({ $isActive }) => ($isActive ? 'visible' : 'hidden')};
`;
const StackImage = styled.img`
    width: 50px;
    height: 50px;
    position: absolute;
    left: -36px;
    top: -26px;
    border-radius: 16px;
    border-width: 2px;
    border-style: solid;
    transform: rotate(-10deg);
    background-color: ${({ theme }) => theme.backgroundColors.darkGray};
`;

const SkillName = styled.p`
    text-align: center;
    margin-top: 16px;
    text-decoration-line: underline;
    text-underline-offset: 6px;
    text-decoration-thickness: 1px;
`;

const ScrollPrevButton = styled.button`
    position: absolute;
    top: 91.5%;
    left: 69.8%;
    background: none;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
    &:hover {
        color: ${({ theme }) => theme.colors.green};
    }
`;

const ScrollNextButton = styled.button`
    position: absolute;
    top: 91.5%;
    left: 73%;
    background: none;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
    &:hover {
        color: ${({ theme }) => theme.colors.green};
    }
`;
const ScrollCount = styled.div`
    position: absolute;
    margin-top: 0.2%;
    padding: 0 0.5% 0 0.2%;
    top: 91%;
    left: 71.4%;
`;

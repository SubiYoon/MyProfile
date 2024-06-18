import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { stackState } from '@/recoil.js';
import { motion } from 'framer-motion';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import {
    ScrollCountBox,
    ScrollNextButton,
    ScrollPrevButton,
    SkillBox,
    SkillNameP,
    SkillsContainer,
    SkillsWrapper,
    StackImage,
    TitleContainer,
    TitleHeaderP,
    TitleSkillsP,
} from '@/components/Styled/SkillsStyledComponents.jsx';

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
                const mediaQuery = window.matchMedia('(max-width: 768px)');
                const itemWidth = mediaQuery.matches ? 70 : 115;
                const itemsPerPage = Math.floor(containerWidth / itemWidth);
                setItemsPerPage(itemsPerPage);
            }
        };

        updateItemsPerPage();
        window.addEventListener('resize', updateItemsPerPage);

        const mediaQuery = window.matchMedia('(max-width: 768px)');
        const handleMediaChange = () => updateItemsPerPage();

        mediaQuery.addEventListener('change', handleMediaChange);

        return () => {
            window.removeEventListener('resize', updateItemsPerPage);
            mediaQuery.removeEventListener('change', handleMediaChange);
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
                <TitleHeaderP>{HeaderText}</TitleHeaderP>
                {skills.map((skill, index) => (
                    <TitleSkillsP
                        $isActive={activeSkill === skill}
                        key={index}
                        index={index}
                        onClick={() => onClickSkill(skill)}
                    >
                        {skill}
                    </TitleSkillsP>
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
                            <SkillNameP>{item.stackName}</SkillNameP>
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
                <ScrollCountBox>
                    {currentPage + 1}/{totalPages}
                </ScrollCountBox>
            )}
        </SkillsWrapper>
    );
});

export default Skills;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { currentPageState } from '@/recoil.js';

const Header = ({ text, gb }) => {
    const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
    const [typedText, setTypedText] = useState('');
    const [textIndex, setTextIndex] = useState(0);
    const [subTextTyped, setSubTextTyped] = useState(false);

    //텍스트 타이핑 효과
    useEffect(() => {
        let mainTextToType = text;
        let typingTimer;

        typingTimer = setTimeout(() => {
            if (textIndex < mainTextToType.length) {
                setTypedText(mainTextToType.substring(0, textIndex + 1));
                setTextIndex((prevIndex) => prevIndex + 1);
            } else {
                const subTextTypingTimer = setTimeout(() => {
                    setSubTextTyped(true);
                }, 90);
            }
        }, 160);

        return () => clearTimeout(typingTimer);
    }, [currentPage, textIndex, text]);

    return (
        <>
            {gb === 'main' ? (
                <>
                    <MainText>{typedText}</MainText>
                    <MainText2 $subTextTyped={subTextTyped}>
                        PORTFOLIO
                    </MainText2>
                </>
            ) : (
                <>{typedText}</>
            )}
        </>
    );
};

export default Header;

const MainText = styled.div`
    width: 100%;
    font-family: 'mainFont';
    font-weight: bolder;
    font-size: ${({ theme }) => theme.fonts.firstMainFontSize};
    text-align: left;
`;

const MainText2 = styled.div`
    width: 100%;
    margin-top: 60px;
    font-weight: bolder;
    font-size: 12rem;
    font-size: ${({ theme }) => theme.fonts.firstMainFontSize};
    text-align: right;
    transition: transform 1s ease;
    transform: translateX(
        ${({ $subTextTyped }) => ($subTextTyped ? '0' : '-100vw')}
    );
`;

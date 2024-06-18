import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentPageState } from '@/recoil.js';

const Header = ({ text, gb }) => {
    const currentPage = useRecoilValue(currentPageState);
    const [typedText, setTypedText] = useState('');
    const [textIndex, setTextIndex] = useState(0);
    const [subTextTyped, setSubTextTyped] = useState(false);

    const mainContent = text.split('||');

    const subText = mainContent[1];

    const renderContent = () => {
        if (gb === 'main') {
            return (
                <>
                    <MainText>{typedText}</MainText>
                    <MainText2 $subTextTyped={subTextTyped}>
                        {subText}
                    </MainText2>
                </>
            );
        } else if (currentPage === gb) {
            return <>{typedText}</>;
        }
    };

    //텍스트 타이핑 효과
    useEffect(() => {
        let mainTextToType = mainContent[0];

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

    return <>{renderContent()}</>;
};

export default Header;

const MainText = styled.div`
    width: 100%;
    font-family: 'consola';
    font-weight: bolder;
    font-size: ${({ theme }) => theme.fonts.firstMainFontSize};
    text-align: left;

    @media screen and (max-width: 768px) {
        font-size: ${({ theme }) => theme.fonts.mobile.firstMainFontSize};
    }
`;

const MainText2 = styled.div`
    width: 100%;
    color: rgba(230, 27, 57, 1);
    font-family: 'menlo';
    margin-top: 60px;
    font-weight: bolder;
    font-size: ${({ theme }) => theme.fonts.firstMainFontSize};
    text-align: right;
    transition: transform 1s ease;
    transform: translateX(
        ${({ $subTextTyped }) => ($subTextTyped ? '0' : '-100vw')}
    );

    @media screen and (max-width: 768px) {
        font-size: ${({ theme }) => theme.fonts.mobile.firstMainFontSize};
    }
`;

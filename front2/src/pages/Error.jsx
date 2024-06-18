import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { styled } from 'styled-components';
import { motion } from 'framer-motion';
import { MdErrorOutline } from 'react-icons/md';
import { PiStudentFill } from 'react-icons/pi';

const Error = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible((prevVisible) => !prevVisible); // isVisible 값을 토글합니다.
        }, 500); // 0.5초마다 isVisible을 변경합니다.

        return () => clearInterval(interval);
    }, []);
    return (
        <Section>
            <ErrorWrapper>
                <ErrorTop>
                    <TopBox>
                        <Exclamation />
                        <TopSpan>Error Page</TopSpan>
                        <TopCancelIcon src="/assets/icons/cancel.png" />
                    </TopBox>
                    <TopIcon src="/assets/icons/powershell.png" />
                    <ErrorIcon src="/assets/icons/errorIcon.png" />
                </ErrorTop>
                <ErrorTextBox>
                    PS C: \404 Not Found >
                    <ErrorText>페이지를 찾을 수 없습니다.</ErrorText>
                    {isVisible ? (
                        <BlinkingErrorText>￨</BlinkingErrorText>
                    ) : null}
                </ErrorTextBox>
                <ErrorDetailBox>
                    + 페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.
                    <br />+ 입력하신 주소가 정확한지 다시 한 번 확인해주세요.
                </ErrorDetailBox>
                <IframeBox>
                    <img src="/assets/icons/dinosaur.jpg" />
                </IframeBox>
            </ErrorWrapper>
        </Section>
    );
};

export default Error;

const Section = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    height: auto;
    color: white;
    position: relative;
    background-color: ${({ theme }) => theme.backgroundColors.darkGray};
`;

const ErrorWrapper = styled(motion.div)`
    display: flex;
    flex-direction: column;
    width: 70%;
    margin: 2% 0 2% 0;
    min-height: 680px;
    height: 100%;
    color: rgb(0, 0, 2);
    font-family: 'Pretendard';
    padding: 2% 0 2% 0;
    background-color: black;
    border-radius: 16px;
    position: relative;
    border-style: solid;
    border-color: rgb(51, 51, 52);
    border-width: 2px;
`;

const ErrorTop = styled.div`
    display: flex;
    position: absolute;
    text-align: center;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 40px;
    top: 0;
    color: rgb(180, 179, 185);
    font-size: ${({ theme }) => theme.fonts.smallFontSize};
    border-radius: 8px 8px 0 0;
    background-color: rgb(51, 51, 52);
    z-index: 1;
`;

const TopIcon = styled.img`
    position: absolute;
    right: 1%;
    top: 24%;
    height: 22px;
    border: none;
    color: red;
`;

const TopCancelIcon = styled.img`
    margin-left: 26px;
`;

const TopSpan = styled.span`
    margin-left: 8px;
`;

const TopBox = styled.div`
    display: flex;
    position: absolute;
    left: 1%;
    top: 25%;
    height: 30px;
    padding: 0 16px 0 12px;
    align-items: center;
    border-radius: 8px 8px 0 0;
    background-color: #0c0c0d;
    color: white;
`;

const ErrorIcon = styled.img`
    position: absolute;
    left: 196px;
    top: 34%;
    height: 22px;
`;

const ErrorTextBox = styled.div`
    display: flex;
    padding: 1%;
    color: rgb(202, 202, 203);
`;

const ErrorDetailBox = styled.div`
    display: flex;
    padding: 1%;
    color: rgb(229, 71, 86);
`;

const ErrorText = styled.div`
    margin-left: 1%;
    color: rgb(247, 239, 165);
`;

const BlinkingErrorText = styled.div`
    display: flex;
    height: 100%;
    position: relative;

    left: -2px;
    color: white;
`;

const Exclamation = styled(MdErrorOutline)`
    color: rgb(68, 121, 212);
    font-size: ${({ theme }) => theme.fonts.normalFontSize};
`;

const IframeBox = styled.div`
    display: flex;
    justify-content: center;
`;

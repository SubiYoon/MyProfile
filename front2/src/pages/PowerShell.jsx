import React, { useState, useMemo } from 'react';
import { styled } from 'styled-components';
import { motion } from 'framer-motion';
import { IoCloseOutline, IoHelpOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import Education from '@/pages/Education.jsx';
import Project from '@/pages/Project.jsx';

const PowerShell = () => {
    const [selectedComponent, setSelectedComponent] = useState('project');

    const handleBoxClick = (component) => {
        setSelectedComponent(component);
    };

    const helpTexts = [
        {
            key: 'cd <directory>',
            value: 'Change directory: 디렉토리를 변경합니다.',
        },
        {
            key: 'll',
            value: 'List detailed directory contents: 자세한 디렉토리 내용을 나열합니다.',
        },
        {
            key: 'cd ~/, cd',
            value: 'Change directory to the home directory: 홈 디렉토리로 이동합니다.',
        },
        { key: 'clear', value: 'Clear screen: 화면을 지웁니다.' },
        {
            key: 'cd ..',
            value: 'Change directory to parent directory: 상위 디렉토리로 이동합니다.',
        },
    ];

    const scrollToBottom = () => {
        // 스크롤을 맨 아래로 이동
        const container = document.getElementById('container');

        container.scrollTop = container.scrollHeight;
    };

    const projectsMemo = useMemo(
        () => <Project focus={focus} scrollToBottom={scrollToBottom} />,
        [],
    );
    const educationMemo = useMemo(() => <Education focus={focus} />, []);

    return (
        <PowerShellSection>
            <PowerShellWrapper>
                <Top>
                    <TitleTopBox>
                        <TopBox
                            $isSelected={selectedComponent === 'project'}
                            onClick={() => handleBoxClick('project')}
                        >
                            <TitleIcon src="/assets/icons/gitbashLogo.png" />
                            <TopSpan>project</TopSpan>
                            <IoCloseOutline />
                        </TopBox>
                        <TopBox
                            $isSelected={selectedComponent === 'education'}
                            onClick={() => handleBoxClick('education')}
                        >
                            <TitleIcon src="/assets/icons/powershellLogo.png" />
                            <TopSpan>education</TopSpan>
                            <IoCloseOutline />
                        </TopBox>
                        <TopIcon src="/assets/icons/powershell.png" />
                        <PowerShellIcon src="/assets/icons/errorIcon.png" />
                        {selectedComponent === 'project' && (
                            <HelpIconWrapper>
                                <HelpIcon />
                                <HelpToolTip>
                                    {helpTexts.map(({ key, value }) => (
                                        <HelpBox key={key}>
                                            <HelpLeft>
                                                <HelpToolTipText>
                                                    {key}
                                                </HelpToolTipText>
                                            </HelpLeft>
                                            <HelpRight>
                                                <HelpToolTipText>
                                                    {value}
                                                </HelpToolTipText>
                                            </HelpRight>
                                        </HelpBox>
                                    ))}
                                </HelpToolTip>
                            </HelpIconWrapper>
                        )}
                    </TitleTopBox>
                </Top>
                <ComponentsBox id="container">
                    {selectedComponent === 'project' && projectsMemo}
                    {selectedComponent === 'education' && educationMemo}
                </ComponentsBox>
            </PowerShellWrapper>
        </PowerShellSection>
    );
};

export default PowerShell;

const PowerShellSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: white;
    position: relative;
`;

const PowerShellWrapper = styled(motion.div)`
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: 2% 0 2% 0;
    color: rgb(0, 0, 2);
    font-family: 'consola';
    padding: 2% 0 0% 0;
    background-color: rgb(12, 12, 13);
    border-radius: 12px;
    position: relative;
    border-style: solid;
    border-color: rgb(51, 51, 52);
    border-width: 2px;
`;

const Top = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: left;
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

const TopSpan = styled.span`
    margin: 0 40px 0 8px;
`;

const TopBox = styled(Link)`
    display: flex;
    height: 36px;
    margin: 0.4% 0.1% 0 0;
    padding: 0 16px 0 12px;
    align-items: center;
    border-radius: 8px 8px 0 0;
    background-color: ${({ $isSelected }) =>
        $isSelected ? '#0c0c0d' : 'transparent'};
    color: white;
    text-decoration: none;
    &:hover {
        cursor: pointer;
        background-color: rgba(12, 12, 13, 0.7);
    }
`;

const TitleIcon = styled.img`
    height: 18px;
`;

const PowerShellIcon = styled.img`
    margin-top: 1%;
    height: 24px;
`;

const ComponentsBox = styled.div`
    display: flex;
    padding: 1%;
    color: rgb(202, 202, 203);
    height: 680px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: rgb(158, 158, 159) transparent; /* 스크롤바와 트랙의 색상을 설정합니다. */

    //특정 브라우저에서 지원 안함. 확인 필요
    ::-webkit-scrollbar-button:vertical:no-button {
        display: none;
    }
    ::-webkit-scrollbar {
        width: 1px;
    }
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

const TitleTopBox = styled.div`
    display: flex;
    width: 80%;
    overflow: hidden;
    padding-left: 0.5%;
`;

const HelpIcon = styled(IoHelpOutline)`
    position: absolute;
    right: 11%;
    top: 24%;
    width: 20px;
    height: 20px;
    border: none;
    animation: blink 0.6s infinite alternate;

    @keyframes blink {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0.2;
        }
    }

    &:hover {
        cursor: pointer;
        animation: none; /* 마우스를 올릴 때 애니메이션을 중지합니다. */
    }
`;

const HelpToolTip = styled.div`
    position: absolute;
    flex-direction: column;
    margin-top: 34px;
    width: 500px;
    right: -260px;
    padding: 24px 12px 12px 12px;
    border-radius: 6px;
    z-index: 10;
    display: none; /* 초기에는 숨깁니다. */
    background-color: rgb(12, 12, 13);
    border-style: solid;
    border-color: rgb(51, 51, 52);
    border-width: 2px;
`;

const HelpIconWrapper = styled.div`
    position: absolute;
    right: 11%;
    top: 24%;
    margin-left: auto;
    margin-right: 10px;
    &:hover ${HelpToolTip} {
        display: flex;
    }
`;

const HelpToolTipText = styled.div`
    white-space: pre-line;
`;

const HelpLeft = styled.div`
    min-width: 26%;
`;
const HelpRight = styled.div`
    margin-left: 2%;
`;

const HelpBox = styled.div`
    display: flex;
    margin-bottom: 2%;
`;

import React, { useState, useRef, useEffect } from 'react';
import {
    TitleBox,
    ProjectTopContainer,
    ConsoleBasic,
    ConsoleInputStyled,
    ProjectTitle,
    ProjectTitle2,
    ProjectTitle3,
} from '@/components/Styled/ProjectStyledComponents.jsx';
import { useRecoilValue } from 'recoil';
import { careerState } from '@/recoil.js';

const ConsoleInput = ({
    inputRef,
    consoleText = '', // 기본값 설정
    setConsoleText,
    handleKeyDown,
    directory,
    name,
    careerSeq,
    countSlashes,
    currentProject,
}) => {
    const [suggestions] = useState(['ll', 'cd', 'clear']);
    const [detailTitle, setDetailTitle] = useState([]);
    const [matchedCommands, setMatchedCommands] = useState([]);
    const [detailMatchedCommands, setDetailMatchCommands] = useState([]);
    const [currentMatchIndex, setCurrentMatchIndex] = useState(0);

    const careerData = useRecoilValue(careerState);

    const handleTabPress = (event) => {
        if (event.key === 'Tab') {
            const inputText = consoleText;

            if (inputText === '') {
                return;
            }

            // cd 공백 후 tab 자동완성
            if (inputText.startsWith('cd ')) {
                const partialInput = inputText.substring(3); // "cd " 이후의 부분만 추출

                if (partialInput === '') {
                    event.preventDefault();
                    return;
                }

                let slashCount = countSlashes(directory);
                let arrayTitle = [];

                if (slashCount === 1) {
                    careerData.forEach((career) => {
                        if (career.careerSeq === careerSeq) {
                            arrayTitle = career.projectList
                                .filter((project) =>
                                    project.projectName.startsWith(
                                        partialInput,
                                    ),
                                )
                                .map((project) => project.projectName);
                        }
                    });
                } else if (slashCount === 2) {
                    arrayTitle = currentProject.projectDetailSemiList
                        .map((item) => item.detailActTitle)
                        .filter((detail) => detail.startsWith(partialInput));
                } else {
                    arrayTitle = careerData
                        .map((career) => career.company)
                        .filter((company) => company.startsWith(partialInput));
                }

                // if (arrayTitle.length > 0) {
                //     setMatchedCommands(arrayTitle);
                //     setCurrentMatchIndex(0);
                //     setConsoleText('cd ' + arrayTitle[0]);
                // } else {
                //     const nextIndex =
                //         (currentMatchIndex + 1) % matchedCommands.length;
                //     setCurrentMatchIndex(nextIndex);
                //     setConsoleText(matchedCommands[nextIndex]);
                // }

                //if 값 수정해야함
                if (detailMatchedCommands.length === 0) {
                    setDetailMatchCommands(arrayTitle);
                    setCurrentMatchIndex(0);
                    setConsoleText('cd ' + arrayTitle[0]);
                } else {
                    const nextIndex =
                        (currentMatchIndex + 1) % detailMatchedCommands.length;
                    setCurrentMatchIndex(nextIndex);
                    setConsoleText('cd ' + detailMatchedCommands[nextIndex]);
                }

                event.preventDefault();
                return;
            }

            const trimmedInput = inputText.trim();

            if (matchedCommands.length === 0) {
                const matches = suggestions.filter((command) =>
                    command.startsWith(trimmedInput),
                );
                setMatchedCommands(matches);
                setCurrentMatchIndex(0);

                if (matches.length > 0) {
                    setConsoleText(matches[0]);
                }
            } else {
                const nextIndex =
                    (currentMatchIndex + 1) % matchedCommands.length;
                setCurrentMatchIndex(nextIndex);
                setConsoleText(matchedCommands[nextIndex]);
            }

            event.preventDefault(); // 기본 탭 이벤트 방지
        }
    };

    useEffect(() => {
        if (consoleText === '') {
            setMatchedCommands([]);
            setCurrentMatchIndex(0);
            setDetailMatchCommands([]);
        }
    }, [consoleText]);
    return (
        <>
            <ProjectTopContainer>
                <ProjectTitle>{name}</ProjectTitle>
                <ProjectTitle>@PROJECT</ProjectTitle>
                <ProjectTitle2>MINGW64</ProjectTitle2>
                <ProjectTitle3>~{directory}</ProjectTitle3>
            </ProjectTopContainer>
            <TitleBox>
                <ProjectTopContainer>
                    <ConsoleBasic>$</ConsoleBasic>
                    <ConsoleInputStyled
                        ref={inputRef}
                        value={consoleText}
                        onChange={(e) => {
                            setConsoleText(e.target.value);
                            setMatchedCommands([]);
                            setCurrentMatchIndex(0); // 사용자가 입력을 변경할 때마다 인덱스 초기화
                        }}
                        onKeyDown={(e) => {
                            handleKeyDown(e);
                            handleTabPress(e); // 탭 이벤트 처리 함수 호출
                        }}
                    />
                </ProjectTopContainer>
            </TitleBox>
        </>
    );
};

export default ConsoleInput;

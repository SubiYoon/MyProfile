import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { careerState, currentPageState } from '@/recoil.js';

import {
    ProjectWrapper,
    ProjectTopContainer,
    ProjectTitle,
    ProjectTitle2,
    ProjectTitle3,
    ErrorText,
    ProjectDetailContainer,
    ProjectTextSpan,
    ProjectNameBox,
} from '@/components/Styled/ProjectStyledComponents.jsx';
import ProjectDetails from '@/components/ProjectDetails.jsx';
import ProjectList from '@/components/ProjectList.jsx';
import ConsoleInput from '@/components/ConsoleInput.jsx';
import ProjectSemiDetail from '@/components/ProjectSemiDetail.jsx';

const Project = React.memo(({ scrollToBottom }) => {
    const careerData = useRecoilValue(careerState);
    const currenPage = useRecoilValue(currentPageState);
    const [consoleText, setConsoleText] = useState('');
    const [history, setHistory] = useState([]);
    const [currentProject, setCurrentProject] = useState(null);
    const [directory, setDirectory] = useState('');
    const [detailProject, setDetailProject] = useState(null);
    const [careerSeq, setCareerSeq] = useState('');
    const inputRef = useRef(null);
    const countSlashes = (str) => {
        return (str.match(/\//g) || []).length;
    };

    const EndDate = (projectTerm) => {
        const endDateStr = projectTerm.split(' ~ ')[1];
        const [year, month] = endDateStr.split('.');
        return new Date(year, month - 1);
    };

    const allProjects = useMemo(() => {
        return careerData
            .flatMap((career) => career.projectList)
            .sort((a, b) => EndDate(b.projectTerm) - EndDate(a.projectTerm));
    }, [careerData]);

    const handleKeyDown = (event) => {
        let slashCount = countSlashes(directory);

        if (event.key === 'Enter') {
            const inputText = consoleText.trim();
            let entry = {
                command: consoleText,
                valid: false,
                cdCheck: false,
                directory: directory,
                showCustomDetails: false,
                detail: false,
            };

            if (inputText === 'cd ~/' || inputText === 'cd') {
                entry.detail = false;
                entry.valid = true;
                entry.project = null;
                setDirectory('');
                setCurrentProject(null);
                entry.directory = '';
                entry.first = true;
            } else {
                switch (inputText) {
                    case 'clear':
                        // 모든 상태 초기화
                        setHistory([]);
                        setConsoleText('');
                        return;
                    case 'll':
                        entry.valid = true;
                        if (slashCount === 1) {
                            entry.project = null;
                            entry.first = false;
                        } else if (currentProject && slashCount === 2) {
                            entry.project = currentProject;
                            entry.showCustomDetails = true;
                        } else if (slashCount === 3) {
                            entry.detail = true;
                            entry.detailProject = detailProject;
                        } else {
                            //첫번째 진입화면
                            entry.project = null;
                            entry.first = true;
                        }
                        break;
                    case 'cd ..':
                        //최상위 디테일
                        entry.detail = false;
                        entry.valid = true;

                        //프로젝트 디테일 진입 분기
                        if (detailProject !== null) {
                            entry.project = currentProject;
                            entry.showCustomDetails = false;
                            setDetailProject(null);
                        } else {
                            entry.project = null;
                            setCurrentProject(null);
                        }
                        setDirectory((prevDirectory) => {
                            const splitted = prevDirectory.split('/');
                            if (splitted.length > 1) {
                                const newDirectory = splitted
                                    .slice(0, -1)
                                    .join('/');
                                entry.directory = newDirectory;
                                return newDirectory;
                            } else {
                                entry.directory = '';
                                return '';
                            }
                        });
                        break;
                    case 'cd ~/':
                        entry.detail = false;
                        entry.valid = true;
                        entry.project = null;
                        setDirectory('');
                        setCurrentProject(null);
                        entry.directory = '';
                        break;
                    default:
                        //semi디테일 화면
                        if (
                            currentProject &&
                            currentProject.projectDetailSemiList.some(
                                (detail) =>
                                    detail.detailActTitle ===
                                    inputText.substring(3),
                            )
                        ) {
                            const foundProject =
                                currentProject.projectDetailSemiList.find(
                                    (project) =>
                                        project.detailActTitle ===
                                        inputText.substring(3),
                                );
                            entry.valid = true;
                            entry.showCustomDetails = true;
                            entry.detail = true;
                            entry.detailProject = foundProject;
                            setDetailProject(entry.detailProject);
                            entry.directory =
                                entry.directory + '/' + inputText.substring(3);
                            setDirectory(entry.directory);
                        } else if (inputText.startsWith('cd ')) {
                            const projectName = inputText.substring(3);

                            if (slashCount === 1) {
                                const foundProject = allProjects.find(
                                    (project) =>
                                        project.projectName === projectName,
                                );

                                entry = { ...entry, cdCheck: true };
                                if (foundProject) {
                                    entry = {
                                        ...entry,
                                        valid: true,
                                        project: foundProject,
                                        directory:
                                            directory +
                                            '/' +
                                            entry.command.substring(3),
                                    };
                                    setCurrentProject(foundProject);
                                    setDirectory(
                                        directory +
                                            '/' +
                                            entry.command.substring(3),
                                    );
                                }
                            } else if (slashCount === 0) {
                                const foundProject = careerData.find(
                                    (project) =>
                                        project.company === projectName,
                                );

                                if (foundProject) {
                                    setCareerSeq(foundProject.careerSeq);
                                    entry.project = null;
                                    entry.valid = true;

                                    entry.count =
                                        foundProject.projectList.length;
                                    entry.directory =
                                        '/' + entry.command.substring(3);
                                    setDirectory(
                                        '/' + entry.command.substring(3),
                                    );
                                }
                            }
                        }
                }
            }

            setHistory([...history, entry]);
            setConsoleText('');
        }
    };

    useEffect(() => {
        if (currenPage === 3) {
            inputRef.current?.focus();
            const keepFocus = () => {
                inputRef.current?.focus();
            };
            inputRef.current?.addEventListener('blur', keepFocus);
            return () => {
                inputRef.current?.removeEventListener('blur', keepFocus);
            };
        }
    }, [currenPage]);

    useEffect(() => {
        scrollToBottom();
    }, [history, directory]);

    return (
        <ProjectWrapper>
            {history.map((entry, index) => (
                <div key={index}>
                    <ProjectTopContainer>
                        <ProjectTitle>{allProjects[0]?.alias}</ProjectTitle>
                        <ProjectTitle>@PROJECT</ProjectTitle>
                        <ProjectTitle2>MINGW64</ProjectTitle2>
                        <ProjectTitle3>~{entry.directory}</ProjectTitle3>
                    </ProjectTopContainer>
                    <ProjectTextSpan>$ {entry.command}</ProjectTextSpan>
                    {entry.valid && entry.command !== 'cd ..' ? (
                        entry.project ? (
                            entry.showCustomDetails ? (
                                <ProjectDetailContainer>
                                    <ProjectTextSpan>
                                        total
                                        {
                                            entry.project.projectDetailSemiList
                                                .length
                                        }
                                    </ProjectTextSpan>
                                    {entry.project.projectDetailSemiList.map(
                                        (detail) => (
                                            <ProjectTopContainer
                                                key={detail.projectDetailSeq}
                                            >
                                                <ProjectTextSpan>
                                                    {entry.project.projectName}
                                                </ProjectTextSpan>
                                                <ProjectNameBox>
                                                    {detail.detailActTitle}
                                                </ProjectNameBox>
                                                <ProjectTextSpan>
                                                    /
                                                </ProjectTextSpan>
                                            </ProjectTopContainer>
                                        ),
                                    )}
                                </ProjectDetailContainer>
                            ) : (
                                <ProjectDetails project={entry.project} />
                            )
                        ) : entry.detail ? (
                            <ProjectSemiDetail
                                item={entry.detailProject}
                                scrollToBottom={scrollToBottom}
                            />
                        ) : (
                            <ProjectList
                                allProjects={allProjects}
                                careerData={careerData}
                                firstCheck={entry.first}
                                careerSeq={careerSeq}
                                count={entry.count}
                            />
                        )
                    ) : entry.cdCheck ? (
                        <ErrorText>
                            bash: cd: {entry.command.substring(3)}: No such file
                            or directory
                        </ErrorText>
                    ) : !entry.valid && entry.command !== 'cd ..' ? (
                        <ErrorText>
                            bash: {entry.command}: command not found
                        </ErrorText>
                    ) : (
                        <p></p>
                    )}
                </div>
            ))}
            <ConsoleInput
                inputRef={inputRef}
                consoleText={consoleText}
                setConsoleText={setConsoleText}
                handleKeyDown={handleKeyDown}
                name={allProjects[0]?.alias}
                directory={directory}
            />
        </ProjectWrapper>
    );
});

export default Project;

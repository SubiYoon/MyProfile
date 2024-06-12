import React from 'react';
import {
    TitleBox,
    ProjectTopContainer,
    ConsoleBasic,
    ConsoleInputStyled,
    ProjectTitle,
    ProjectTitle2,
    ProjectTitle3,
} from '@/components/Styled/ProjectStyledComponents.jsx';

const ConsoleInput = ({
    inputRef,
    consoleText,
    setConsoleText,
    handleKeyDown,
    directory,
    name,
}) => {
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
                        onChange={(e) => setConsoleText(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </ProjectTopContainer>
            </TitleBox>
        </>
    );
};

export default ConsoleInput;
